import { Dispatch, SetStateAction } from 'react';
import RoutineClient from '../../service/routine-client';

/* routine status 타입 */
export type ActiveStatus = 'DO' | 'DONE';
export type TimeStatus = '아침' | '오후' | '저녁';

/* children 타입 */
export interface IChildrenType {
	children: React.ReactNode;
	className?: string;
}

export interface IRoutineControllerType {
	routineController: RoutineClient;
}

export interface IRoutine {
	id: number;
	title: string;
	content: string;
	date: string;
	activeStatus: ActiveStatus;
	timeStatus: TimeStatus;
}

export interface IRoutineContextProps {
	routineContextList: IRoutine[];
	setRoutineContextList: Dispatch<SetStateAction<IRoutine[]>>;
	viewAll: boolean;
	setViewAll: Dispatch<SetStateAction<boolean>>;
	getAllRoutines: () => void;
}