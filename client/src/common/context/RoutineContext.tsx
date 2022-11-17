/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext, useState } from 'react';
import { IChildrenType, IRoutine, IRoutineContextProps } from '../type/type';

const defaultValue: IRoutineContextProps = {
	routineContextList: [],
	setRoutineContextList: () => {},
};

export const RoutineContext = createContext(defaultValue);

export const RoutineProvider = ({ children }: IChildrenType) => {
	const [routineContextList, setRoutineContextList] = useState<IRoutine[]>([]);

	const value = {
		routineContextList,
		setRoutineContextList,
	};

	return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
};
