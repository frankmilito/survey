import { ProtectedRoute } from "../components/protected-route";
import Dashboard from "../pages/dashboard";
import Survey from "../pages/survey";
import SurveyDetails from "../pages/survey/SurveyDetails";
import UserOnboarding from "../pages/user-onboarding";
import { Layout } from "./Layout";

export default function privateRoutes() {
  return {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/onboarding",
        element: <UserOnboarding />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/survey",
        element: <Survey />,
      },
      {
        path: "/survey/:id",
        element: <SurveyDetails />,
      },
    ],
  };
}
