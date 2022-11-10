/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext, useCallback, useContext, useState } from 'react';
import { IChildrenType, IRoutine, IRoutineContextProps } from '../type/type';
import RoutineControllerContext from './RoutineControllerContext';

const defaultValue: IRoutineContextProps = {
	routineContextList: [],
	setRoutineContextList: () => {},
	getAllRoutines: () => {},
};

export const RoutineContext = createContext(defaultValue);

export const RoutineProvider = ({ children }: IChildrenType) => {
	const [routineContextList, setRoutineContextList] = useState<IRoutine[]>([]);
	const routineController = useContext(RoutineControllerContext);

	//FIXME :공부하고 주석지우기
	// const getRoutines = useCallback(async () => {
	// 	setRoutineList(await routineController.getRoutines());
	// },[routineController])

	// useEffect(() => {
	// 	getRoutines();
	// }, [getRoutines]);

	const getAllRoutines = useCallback(async () => {
		const response = await routineController.getRoutines();
		setRoutineContextList(response.data);
	}, [routineController]);

	const value = {
		routineContextList,
		setRoutineContextList,
		getAllRoutines,
	};

	return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
};
