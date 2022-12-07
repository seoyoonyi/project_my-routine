import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
import TokenStorage from "../utils/token";

const tokenStorage = new TokenStorage();

export type userType = {
  id: number;
  token: string;
};

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  token: userType["token"] | null;
  login: (user: userType) => void;
  logout: () => void;
};

/* eslint-disable @typescript-eslint/no-empty-function */
const contextDefaultValues: ContextType = {
  token: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(contextDefaultValues);

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<userType["token"] | null>(null);

  useEffect(() => {
    const ret = tokenStorage.getToken();
    if (!ret) {
      return;
    }
    const { id, token } = ret;

    (async () => {
      // TODO: user-client 만들거나 localhost:8000을 베이스 url로 변경
      const response = await axios.get(`http://localhost:8000/users/${id}`);
      const {
        data: { data, success },
      } = response;
      if (success && data.haskeepLogin) {
        setToken(token);
      }
    })();
  }, []);

  const login = (user: userType) => {
    setToken(user.token);
    tokenStorage.saveToken({ token: user.token, id: user.id });
  };

  const logout = () => {
    setToken(null);
    tokenStorage.removeToken();
  };

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
