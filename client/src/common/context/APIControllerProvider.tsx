import axios from 'axios';
import { createContext } from 'react';
import RoutineClient from '../../service/routine-client';
import UserClient from '../../service/user-client';
import { IChildrenType } from '../type/type';

const httpClient = axios.create({
	baseURL: 'http://localhost:8000/',
});
const routineController = new RoutineClient(httpClient);
const userController = new UserClient(httpClient);

export const RoutineControllerContext = createContext(routineController);
export const UserControllerContext = createContext(userController);

export const APIControllerProvider = ({ children }: IChildrenType) => {
	return (
		<UserControllerContext.Provider value={userController}>
			<RoutineControllerContext.Provider value={routineController}>
				{children}
			</RoutineControllerContext.Provider>
		</UserControllerContext.Provider>
	);
};

export default APIControllerProvider;
