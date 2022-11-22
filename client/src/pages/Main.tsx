import { useEffect, useState, useCallback, useContext } from 'react';
import Header from '../components/Header';
import CurrentWeekTap from '../components/CurrentWeekTap';
import MainContainer from '../components/MainContainer';
import { ActiveStatus, TimeStatus } from '../common/type/type';
import ToDoList from '../components/ToDoList';
import RoutineNav from '../components/RoutineNav';
import useRoutines from '../common/hooks/use-routines';
import { RoutineContext } from '../common/context/RoutineContext';
export interface IRoutine {
	id: number;
	title: string;
	content: string;
	date: string;
	activeStatus: ActiveStatus;
	timeStatus: TimeStatus;
}

const Main = () => {
	const { getRoutine } = useRoutines();
	const { dayNumber, setDayNumber, setActive, currentWeek, today, setChangeActiveStatus, setOnBorder } = useContext(RoutineContext);
	const [onAdd, setOnAdd] = useState<boolean>(false);

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
	}, [currentWeek, setOnBorder, today]);

	useEffect(() => {
		getRoutine(today);
		highlightThisWeek();
	}, [getRoutine, today, highlightThisWeek]);

	return (
		<>
			<Header />
			<MainContainer>
				<RoutineNav changeWeek={changeWeek} onAdd={onAdd} routineToggle={routineToggle} ActiveStatusTolggle={ActiveStatusTolggle} />
				<CurrentWeekTap />
				<ToDoList />
			</MainContainer>
		</>
	);
};

export default Main;
