import axios from 'axios';
import { createContext } from 'react';
import RoutineClient from '../../service/routine-client';
import { IChildrenType } from '../type/type';

const httpClient = axios.create({
	baseURL: 'http://localhost:8000/',
});
const routineController = new RoutineClient(httpClient);

export const RoutineControllerContext = createContext(routineController);
export const RoutineControllerProvider = ({ children }: IChildrenType) => {
	return (
		<RoutineControllerContext.Provider value={routineController}>
			{children}
		</RoutineControllerContext.Provider>
	);
};

export default RoutineControllerContext;
