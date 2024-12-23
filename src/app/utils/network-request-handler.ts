import type { AxiosRequestConfig } from "axios";

import { setAuthorizationHeader, setRetryConfig } from "./axios-retry-utility";

export default function handleNetworkRequest(
  config: AxiosRequestConfig & { apiId: string; retryConfig: any }
) {
  // @ts-ignore
  setRetryConfig(config);

  // @ts-ignore
  setAuthorizationHeader(config);

  return config;
}
