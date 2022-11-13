/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext, useContext } from 'react';
import TokenStorage from '../utils/token';
const tokenStorage = new TokenStorage();

export type userType = {
	token: string;
};

type Props = {
	children: React.ReactNode;
};

type ContextType = {
	user: userType | null;
	login: (user: userType) => void;
	logout: () => void;
};

const contextDefaultValues: ContextType = {
	user: null,
	login: () => {},
	logout: () => {},
};

const AuthContext = createContext(contextDefaultValues);

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<userType | null>(null);

	const login = (user: userType) => {
		setUser(user);
		tokenStorage.saveToken(user);
	};

	const logout = () => {
		setUser(null);
		tokenStorage.removeToken();
	};

	const value = {
		user,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};