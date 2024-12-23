import axios from "axios";
import { REACT_APP_API_URL } from "./constants";
import HttpStatusCode from "./http-status-code";

import handleNetworkError from "./network-error-handler";
import handleNetworkRequest from "./network-request-handler";
import handleNetworkResponse from "./network-response-hander";

/**
 * Create a custom version of the create function of axios
 * that injects our error handling in every instance
 */
const axiosCreateFn = axios.create;
axios.create = function customAxiosCreate(config) {
  const instance = axiosCreateFn.call(axios, config);
  instance.defaults.validateStatus = (status) =>
    (status >= HttpStatusCode.OK && status < HttpStatusCode.MULTIPLE_CHOICES) ||
    status === HttpStatusCode.NOT_MODIFIED;

  // @ts-ignore
  instance.interceptors.request.use(handleNetworkRequest);
  instance.interceptors.response.use(
    handleNetworkResponse,
    handleNetworkError.bind(null, instance)
  );

  return instance;
};

export default axios;

export const client = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_API_URL,
});
