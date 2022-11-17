import { useEffect, useState, useCallback, useMemo } from 'react';
import Header from '../components/Header';
import CurrentWeekTap from '../components/CurrentWeekTap';
import MainContainer from '../components/MainContainer';
import { ActiveStatus, TimeStatus } from '../common/type/type';
import ToDoList from '../components/ToDoList';
import RoutineNav from '../components/RoutineNav';
import useRoutines from '../common/hooks/use-routines';
import { getCurrentWeekByHyphen, getStringDate } from '../common/utils/utils';
export interface IRoutine {
	id: number;
	title: string;
	content: string;
	date: string;
	activeStatus: ActiveStatus;
	timeStatus: TimeStatus;
}

const Main = () => {
	const [dayNumber, setDayNumber] = useState(0);
	const today = getStringDate();
	const currentWeek = useMemo(() => getCurrentWeekByHyphen(dayNumber), [dayNumber]);
	const dayIndex = currentWeek.findIndex((it: string) => it === today);
	const [active, setActive] = useState<number>(dayIndex || 0);
	const [moveDistance, setMoveDistance] = useState<number>(0);

	const { getRoutine } = useRoutines({ active, moveDistance, setMoveDistance, currentWeek, setActive });

	const [onAdd, setOnAdd] = useState<boolean>(false);
	const [onBorder, setOnBorder] = useState<boolean>(false);
	const [changeActiveStatus, setChangeActiveStatus] = useState<boolean>(false);

	const changeWeek = (btnValue: number) => {
		setDayNumber(dayNumber + btnValue);
		setActive(7);
		setOnBorder(true);
	};

	const routineToggle = () => {
		setOnAdd((prev) => !prev);
	};

	const ActiveStatusTolggle = () => {
		setChangeActiveStatus((pre) => !pre);
	};

	const highlightThisWeek = useCallback(() => {
		if (currentWeek.includes(today)) {
			setOnBorder(false);
		}
	}, [currentWeek, today]);

	useEffect(() => {
		getRoutine(today);
		highlightThisWeek();
	}, [getRoutine, today, highlightThisWeek]);

	return (
		<>
			<Header />
			<MainContainer>
				<RoutineNav
					changeWeek={changeWeek}
					changeActiveStatus={changeActiveStatus}
					onAdd={onAdd}
					routineToggle={routineToggle}
					ActiveStatusTolggle={ActiveStatusTolggle}
					today={today}
				/>
				<CurrentWeekTap onBorder={onBorder} dayNumber={dayNumber} moveDistance={moveDistance} />
				<ToDoList changeActiveStatus={changeActiveStatus} />
			</MainContainer>
		</>
	);
};

export default Main;
