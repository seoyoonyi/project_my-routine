import { Dispatch, SetStateAction } from 'react';
import RoutineClient from '../../service/routine-client';

/* routine status 타입 */
export type StatusType = 'DO' | 'DONE';

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
	status: StatusType;
}

export interface IRoutineContextProps {
	routineContextList: IRoutine[];
	setRoutineContextList: Dispatch<SetStateAction<IRoutine[]>>;
	getAllRoutines: () => void;
}
