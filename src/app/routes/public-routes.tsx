import { AuthRoute } from "../components/protected-route";

import { Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import Login from "../pages/login";
import Register from "../pages/register";
import RegistrationSuccess from "../components/success/RegistrationSuccess";
import LoginSuccess from "../components/success/LoginSuccess";
import PasswordReset from "../pages/password-reset";
import NewPassword from "../pages/new-password";
import PasswordChanged from "../components/success/PasswordChanged";

export default function routes() {
  return {
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <RegistrationSuccess />,
      },
      {
        path: "/login-link",
        element: <LoginSuccess />,
      },
      {
        path: "/reset-password",
        element: <PasswordReset />,
      },
      {
        path: "/new-password",
        element: <NewPassword />,
      },
      {
        path: "/reset-success",
        element: <PasswordChanged />,
      },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  };
}
