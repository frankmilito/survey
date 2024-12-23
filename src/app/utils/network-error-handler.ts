import type { AxiosError, AxiosInstance } from "axios";
import get from "lodash-es/get";
import type { ReactNode } from "react";

import HttpStatusCode from "./http-status-code";

import { Error } from "../../types/Error";
import { retryRequest, shouldRetryRequest } from "../utils";

const ignoreErrorCodes = [HttpStatusCode.NOT_FOUND];
const ignoreAPIs: string[] = [];

const returnErrorHeader = (
  networkError: AxiosError,
  header: ReactNode = ""
): ReactNode => {
  let errorHeader = header;

  if (networkError.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range 2xx
    errorHeader =
      errorHeader ||
      `Our service returned an error [${networkError.response.status}]`;
  } else if (networkError.request) {
    // The request was made but no response was received `networkError.request` is an instance of XMLHttpRequest
    errorHeader =
      errorHeader || "A connection to our service cannot be established";
  } else {
    errorHeader = errorHeader || "An unexpected error happened";
  }

  return errorHeader;
};

const returnErrorMessage = (networkError: AxiosError) => {
  let errorMessage = "Something went wrong. Please try again later.";

  if (networkError.response) {
    errorMessage = (networkError.response?.data as Error)?.message;
  } else {
    errorMessage = errorMessage || "An unexpected error happened";
  }
  return errorMessage;
};

const shouldHandleApiErrorAutomatically = (networkError: AxiosError) => {
  if (
    ignoreErrorCodes.includes(networkError?.response?.status as HttpStatusCode)
  ) {
    return false;
  }

  const apiEndpointUrl =
    get(networkError, "config.baseURL", "") +
    get(networkError, "config.url", "");

  const apiEndpointMethod = networkError?.config?.method?.toUpperCase();

  return !ignoreAPIs.some(
    // @ts-ignore
    ([api, method = ""]) =>
      apiEndpointUrl.includes(api) &&
      (method ? method === apiEndpointMethod : true)
  );
};

export default function handleNetworkError(
  axiosInstance: AxiosInstance,
  networkError: AxiosError
) {
  if (shouldRetryRequest(networkError)) {
    return retryRequest(networkError, axiosInstance);
  }

  let errorHeader: ReactNode = "";
  let errorMessage: ReactNode = "";

  if (shouldHandleApiErrorAutomatically(networkError)) {
    errorHeader = returnErrorHeader(networkError);
    errorMessage = returnErrorMessage(networkError);
  }

  return Promise.reject({
    originalError: networkError,
    errorHeader,
    errorMessage: errorMessage,
  });
}
