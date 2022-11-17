import { useCallback, useContext, useMemo, useState } from 'react';
import { RoutineContext } from '../context/RoutineContext';
import RoutineControllerContext from '../context/RoutineControllerContext';
import { getCurrentWeekByHyphen, getStringDate } from '../utils/utils';

const useRoutines = ({ active, moveDistance, setMoveDistance, currentWeek, setActive }: any) => {
	// const [dayNumber, setDayNumber] = useState(0);
	// const today = getStringDate();
	// const currentWeek = useMemo(() => getCurrentWeekByHyphen(dayNumber), [dayNumber]);
	// const dayIndex = currentWeek.findIndex((it: string) => it === today);
	// const [active, setActive] = useState<number>(dayIndex || 0);
	// const [moveDistance, setMoveDistance] = useState<number>(0);
	const routineController = useContext(RoutineControllerContext);
	const { setRoutineContextList } = useContext(RoutineContext);

	const borderActive = (index: number) => {
		setMoveDistance(100 * index);
	};

	const getRoutine = useCallback(
		async (date?: string) => {
			const response = await routineController.getRoutinesByDate(date);
			const getRoutineDateIndex = currentWeek.findIndex((it: string) => it === date);

			setRoutineContextList(response.data);
			borderActive(getRoutineDateIndex);
			setActive(getRoutineDateIndex);

			if (!date) {
				return;
			}
		},
		[routineController, currentWeek, setRoutineContextList],
	);

	return { getRoutine, moveDistance, active, setActive, currentWeek };
};

export default useRoutines;
