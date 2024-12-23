import type { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import { client } from "./client";

const USE_URL_AS_API_ID = "USE_URL_AS_API_ID";

export const makeGetCaller = <T = unknown, P = { [key in string]: unknown }>(
  path: string,
  searchQuery?: P
) =>
  client
    .get<T>(
      `${path}${qs.stringify(searchQuery, {
        addQueryPrefix: true,
        indices: false,
      })}`,
      {
        apiId: USE_URL_AS_API_ID,
      } as AxiosRequestConfig
    )
    .then((response) => response.data);

export const makeDynamicGetCaller = <T = unknown>(
  path: string,
  apiId: string
) =>
  client
    .get<T>(path, { apiId } as AxiosRequestConfig)
    .then((response) => response.data);

export const makePostCaller = <T = unknown>(path: string, payload?: unknown) =>
  client
    .post<T>(path, payload, {
      apiId: USE_URL_AS_API_ID,
    } as AxiosRequestConfig)
    .then((response) => response.data);

export const makeDeleteCaller = <T = unknown>(path: string) =>
  client
    .delete<T>(path, {
      apiId: USE_URL_AS_API_ID,
    } as AxiosRequestConfig)
    .then((response) => response.data);

export const makePatchCaller = <T = unknown>(path: string, payload?: unknown) =>
  client
    .patch<T>(path, payload, {
      apiId: USE_URL_AS_API_ID,
    } as AxiosRequestConfig)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const makePutCaller = <T = unknown>(path: string, payload?: unknown) =>
  client
    .put<T>(path, payload, {
      apiId: USE_URL_AS_API_ID,
    } as AxiosRequestConfig)
    .then((response) => response.data);
