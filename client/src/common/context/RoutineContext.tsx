/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext, useMemo, useState } from 'react';
import { IChildrenType, IRoutine, IRoutineContextProps } from '../type/type';
import { getCurrentWeekByHyphen, getStringDate } from '../utils/utils';

const defaultValue: IRoutineContextProps = {
	routineContextList: [],
	setRoutineContextList: () => {},
	active: 0,
	setActive: () => {},
	moveDistance: 0,
	setMoveDistance: () => {},
	currentWeek: [],
	dayNumber: 0,
	setDayNumber: () => {},
	today: '',
	changeActiveStatus: false,
	setChangeActiveStatus: () => {},
};

export const RoutineContext = createContext(defaultValue);

export const RoutineProvider = ({ children }: IChildrenType) => {
	const [routineContextList, setRoutineContextList] = useState<IRoutine[]>([]);
	const [dayNumber, setDayNumber] = useState(0);
	const today = getStringDate();
	const currentWeek = useMemo(() => getCurrentWeekByHyphen(dayNumber), [dayNumber]);
	const dayIndex = currentWeek.findIndex((it: string) => it === today);
	const [active, setActive] = useState<number>(dayIndex || 0);
	const [moveDistance, setMoveDistance] = useState<number>(0);
	const [changeActiveStatus, setChangeActiveStatus] = useState<boolean>(false);

	const value = {
		routineContextList,
		setRoutineContextList,
		active,
		setActive,
		moveDistance,
		setMoveDistance,
		currentWeek,
		dayNumber,
		setDayNumber,
		today,
		changeActiveStatus,
		setChangeActiveStatus,
	};

	return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
};
