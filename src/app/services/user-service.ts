import { makeGetCaller, makePostCaller } from "../utils";

import type { Company, User } from "types/User";

const endpoints = () => ({
  getProfile: () => makeGetCaller<User>("/users/profile"),
  updateCompany: (payload: Company) => makePostCaller("/teams", payload),
});

export default (function UserService() {
  return endpoints();
})();
