import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  exponentialDelay,
  isNetworkOrIdempotentRequestError,
} from "axios-retry";

import { getItemFromStorage } from "./local-storage";
import { store } from "@/store";

const retryConfigNamespace = "axios-retry-utility";

const MAX_RETRY_COUNT = 1;

/**
 * Custom adaptation of axios-retry https://github.com/softonic/axios-retry
 */

/**
 * This method has been copied from axios-retry since is not exposed from the library
 * Axios fails merging this configuration to the default configuration because it has an issue
 * with circular structure: http://github.com/mzabriskie/axios/issues/370
 * @param {AxiosInstance} axios
 * @param {AxiosRequestConfigWithRetry} config
 */
function fixConfig(axios: AxiosInstance, config: AxiosRequestConfigWithRetry) {
  // @ts-ignore
  if (axios.defaults?.agent === config.agent) {
    //@ts-ignore
    delete config.agent;
  }
  if (axios.defaults?.httpAgent === config.httpAgent) {
    delete config.httpAgent;
  }
  if (axios.defaults?.httpsAgent === config.httpsAgent) {
    delete config.httpsAgent;
  }
}

type AxiosRequestConfigWithRetry = AxiosRequestConfig & {
  [retryConfigNamespace]: {
    retryCount: number;
    lastRequestTime: number;
  };
};

/**
 * Initialize and returns the retry state for the given request/config
 * @param {AxiosRequestConfig} config
 * @returns {Object}
 */
const getCurrentState = (config: AxiosRequestConfigWithRetry) => {
  const currentState = config[retryConfigNamespace] || {};
  currentState.retryCount = currentState.retryCount || 0;
  config[retryConfigNamespace] = currentState;
  return currentState;
};

/**
 * Initialize and returns the header for the given request/config
 * @param {AxiosRequestConfig} config
 * @returns {Object}
 */
const getHeaders = (config: AxiosRequestConfigWithRetry) => {
  const bearerToken =
    store.getState()?.app?.token || store.getState()?.app?.tempToken;
  // const headers = {
  //   ...config.headers,
  //   Authorization: `Bearer ${bearerToken}`,
  // };
  if (bearerToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${bearerToken}`;
  }
};

export const setRetryConfig = (config: AxiosRequestConfigWithRetry) => {
  const currentState = getCurrentState(config);
  currentState.lastRequestTime = Date.now();
};

export const setAuthorizationHeader = (config: AxiosRequestConfigWithRetry) => {
  getHeaders(config);
};

/**
 * Use axios-retry isNetworkOrIdempotentRequestError function to determine is should be retried.
 * It retries Network Errors and should 5xx on idempotent HTTP verbs
 * @param error
 * @returns boolean
 */
export const shouldRetryRequest = (error: AxiosError) => {
  if (!error?.config) {
    return false;
  }
  const retryConfig = getCurrentState(
    error.config as AxiosRequestConfigWithRetry
  );
  return (
    isNetworkOrIdempotentRequestError(error) &&
    retryConfig.retryCount < MAX_RETRY_COUNT
  );
};

export const retryRequest = (
  error: AxiosError,
  axiosInstance: AxiosInstance
) => {
  const { config } = error;
  const retryConfig = getCurrentState(config as AxiosRequestConfigWithRetry);
  retryConfig.retryCount += 1;
  const delay = exponentialDelay(retryConfig.retryCount);

  fixConfig(axiosInstance, config as AxiosRequestConfigWithRetry);

  if (config) {
    // Keep the timeout updated with the time already elapsed in the previous retries
    if (config.timeout && retryConfig.lastRequestTime) {
      const lastRequestDuration = Date.now() - retryConfig.lastRequestTime;
      // Minimum 1ms timeout (passing 9 or less to XHR means no timeout)
      config.timeout = Math.max(
        config.timeout - lastRequestDuration - delay,
        1
      );
    }

    config.transformRequest = [(data) => data];

    return new Promise((resolve) =>
      setTimeout(() => resolve(axiosInstance(config)), delay)
    );
  }
};
