import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RequestOTP } from "@/types/auth";
import { Company, User } from "@/types/User";
import { store } from "@/store";

export interface AppState {
  error: boolean;
  loading: boolean;
  team: string;
  otp?: string;
  tempToken: string;
  token: string;
  contact: string;
  password: string;
  user: Partial<User>;
  company: Company;
}

export const initialState: AppState | undefined = {
  loading: false,
  error: false,
  contact: "",
  password: "",
  otp: "",
  team: "",
  token: "",
  tempToken: "",
  user: {
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
  },
  company: {
    companySize: "",
    country: "",
    industry: "",
    name: "",
    useCase: [],
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    hydrate: (state) => {
      state.loading = false;
      state.error = false;
    },
    logout: (state) => initialState,
    requestOtp: (state, action) => {
      state.loading = true;
      state.contact = action.payload.email;
      state.password = action.payload.password;
      state.user.lastName = action.payload.lastName;
      state.user.firstName = action.payload.firstName;
      state.user.jobTitle = action.payload.jobTitle;
    },
    signup: (state, action: PayloadAction<RequestOTP & { otp: string }>) => {
      state.loading = true;
      state.contact = action.payload.email;
    },
    verifyOTP: (state, action) => {
      console.log(action.payload, "acg");
      state.loading = true;
      state.otp = action.payload.otp;
    },
    verifyOTPSuccess: (state, action) => {
      state.loading = false;
      state.tempToken = action.payload;
    },
    resetPassword: (state, action) => {
      state.loading = true;
    },
    login: (state, action) => {
      state.loading = true;
    },
    setToken: (state, action) => {
      state.token = action.payload.access_token;
    },
    getProfile: (state) => {
      state.loading = true;
    },

    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.password = "";
      state.user = action.payload;
      state.team = action.payload?.teams[0]?._id;
    },
    setCompanyFormData: (state, action) => {
      state.loading = false;
      state.company = {
        ...state.company,
        ...action.payload,
      };
    },
    updateCompany: (state) => {
      state.loading = true;
    },
    updateCompanySuccess: (state, action) => {
      state.loading = false;
      state.user.teams = action.payload;
    },
    setSuccess: (state) => {
      state.loading = false;
    },
    setError: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
  selectors: {
    isLoading: (state) => state.loading,
    selectUserPayload: (state) => ({
      contact: state.contact,
      firstName: state.user.lastName,
      lastName: state.user.firstName,
      jobTitle: state.user.jobTitle,
      password: state.password,
      otp: state.otp,
    }),
    selectUserDetails: (state) => state.user,
    getTeam: (state) => state.team,
  },
});

export const { actions: appActions, reducer, selectors } = slice;

export const useAppSlice = () => {
  store.injectReducer(slice.name, slice.reducer);
  return { actions: slice.actions };
};

export default slice;
