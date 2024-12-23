import { useAppSelector } from "@/store";
import { useAuth } from "../../hooks/use-auth";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { router } from "@/app/routes";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.app.token);
  const teams = useAppSelector((state) => state.app?.user?.teams);
  const isOnboarding = teams?.length === 0;

  useEffect(() => {
    if (isOnboarding) {
      navigate("/onboarding?step=1");
    }
  }, [isOnboarding, navigate]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const AuthRoute = ({ children }) => {
  const token = useAppSelector((state) => state.app.token);

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
