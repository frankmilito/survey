import { createContext, useContext, useMemo } from "react";
import { User } from "types/User";
import { useAppSelector } from "@/store";

interface AuthProps {
  token: null | string;
  logout?: () => void;
  user: Partial<User>;
}

const AuthContext = createContext<AuthProps>({
  token: null,
  user: {},
});

export const AuthProvider = ({ children }) => {
  const token = useAppSelector((state) => state.app.token);
  const user = useAppSelector((state) => state.app.user);

  const value = useMemo(
    () => ({
      token,
      user,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
