/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext, useContext } from 'react';
import TokenStorage from '../utils/token';
const tokenStorage = new TokenStorage();

export type userType = {
	haskeepLogin: boolean;
	token: string;
};

type Props = {
	children: React.ReactNode;
};

type ContextType = {
	token: userType['token'] | null;
	login: (user: userType) => void;
	logout: () => void;
};

const contextDefaultValues: ContextType = {
	token: null,
	login: () => {},
	logout: () => {},
};

const AuthContext = createContext(contextDefaultValues);

export const AuthProvider = ({ children }: Props) => {
	const [token, setToken] = useState<userType['token'] | null>(null);

	const login = (user: userType) => {
		setToken(user.token);
		tokenStorage.saveToken(user.token);
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
