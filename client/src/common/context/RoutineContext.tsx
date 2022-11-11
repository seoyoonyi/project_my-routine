/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext, useCallback, useContext, useState } from 'react';
import { IChildrenType, IRoutine, IRoutineContextProps } from '../type/type';
import RoutineControllerContext from './RoutineControllerContext';

const defaultValue: IRoutineContextProps = {
	routineContextList: [],
	setRoutineContextList: () => {},
	viewAll: false,
	setViewAll: () => {},
	getAllRoutines: () => {},
};

export const RoutineContext = createContext(defaultValue);

export const RoutineProvider = ({ children }: IChildrenType) => {
	const [routineContextList, setRoutineContextList] = useState<IRoutine[]>([]);
	const [viewAll, setViewAll] = useState<boolean>(false);
	const routineController = useContext(RoutineControllerContext);

	const getAllRoutines = useCallback(async () => {
		const response = await routineController.getRoutines();
		setRoutineContextList(response.data);
	}, [routineController]);

	const value = {
		routineContextList,
		setRoutineContextList,
		viewAll,
		setViewAll,
		getAllRoutines,
	};

	return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
};
