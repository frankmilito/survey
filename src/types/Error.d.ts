import HttpStatusCode from "../app/utils";

export type Error = {
  error: string;
  message: string;
  status: HttpStatusCode;
};
