import { useCallback, useContext } from 'react';
import { RoutineContext } from '../context/RoutineContext';
import { RoutineControllerContext } from '../context/APIControllerProvider';

const useRoutines = () => {
	const routineController = useContext(RoutineControllerContext);
	const { setRoutineContextList, setMoveDistance, currentWeek, setActive } =
		useContext(RoutineContext);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentWeek, routineController, setActive, setRoutineContextList],
	);

	return { getRoutine };
};

export default useRoutines;
