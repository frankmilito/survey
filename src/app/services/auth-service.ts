import type { AxiosInstance } from "axios";

import type { Token, User } from "types/User";
import { client } from "../utils/client";
import { makePostCaller } from "../utils/axios-wrapper";
import { RequestOTP } from "@/types/auth";

const endpoints = () => ({
  requestOtp: (payload: RequestOTP) =>
    makePostCaller<{ message: string }>("/auth/request-otp", {
      contact: payload.email,
      purpose: payload.purpose,
    }),
  verifyOtp: (payload: RequestOTP & { otp: string }) =>
    makePostCaller("/auth/verify-otp", {
      contact: payload.email,
      purpose: payload.purpose,
      otp: payload.otp,
    }),
  signup: (payload: Partial<User> & { otp: string; password: string }) =>
    makePostCaller<Token>("/auth/signup", {
      otp: payload.otp,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    }),
  login: (payload: { email: string; password: string }) =>
    makePostCaller<Token>("/auth/login", {
      email: payload.email,
      password: payload.password,
    }),
  resetPassword: (payload: { email: string; password: string; otp: string }) =>
    makePostCaller("/auth/reset-password", payload),
});

export default (function AuthService() {
  return endpoints();
})();
