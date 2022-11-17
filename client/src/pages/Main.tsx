import { useEffect, useState, useCallback, useMemo, ChangeEvent } from 'react';
import Btn from '../components/Btn';
import RoutineEditor from '../components/RoutineEditor';
import Header from '../components/Header';
import CurrentWeekTap from '../components/CurrentWeekTap';
import { getCurrentWeekByHyphen, getStringDate } from '../common/utils/utils';
import styles from './Main.module.css';
import MainContainer from '../components/MainContainer';
import { ActiveStatus, TimeStatus } from '../common/type/type';
import { useContext } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import RoutineControllerContext from '../common/context/RoutineControllerContext';
import DropDown from '../components/DropDown';
import ToDoList from '../components/ToDoList';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import RoutineNav from '../components/RoutineNav';
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
	const [onAdd, setOnAdd] = useState<boolean>(false);
	const [onBorder, setOnBorder] = useState<boolean>(false);
	const routineController = useContext(RoutineControllerContext);
	const { setRoutineContextList, viewAll, setViewAll, getAllRoutines } = useContext(RoutineContext);

	const changeWeek = (btnValue: number) => {
		setDayNumber(dayNumber + btnValue);
		setActive(7);
		setOnBorder(true);
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

	const getRoutineActive = useCallback(
		async (activeStatus: string) => {
			const response = await routineController.getRoutinesByCondition(activeStatus);

			setRoutineContextList(response.data);
		},
		[routineController, setRoutineContextList],
	);

	const routineToggle = () => {
		setOnAdd((prev) => !prev);
	};

	const borderActive = (index: number) => {
		setMoveDistance(100 * index);
	};

	const viewAllToggle = () => {
		setViewAll((viewAll) => !viewAll);
		if (!viewAll) {
			getAllRoutines();
			setActive(7);
			setOnBorder(!onBorder);
		} else {
			getRoutine(today);
			setActive(dayIndex);
			setOnBorder(!onBorder);
		}
	};

	const borderController = { onBorder, setOnBorder };
	const routinesAndEtcController = { getRoutine, routineToggle, onAdd };
	const currentWeekController = {
		currentWeek,
		getRoutine,
		active,
		moveDistance,
		onBorder,
		setOnBorder,
		dayNumber,
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
				{/* 루틴 전체 보기 조회 리스트  */}
				{/* 		<div className={styles.mainBtnGroup}>
					<Btn className={'rounded-md' + (viewAll ? ` ${styles.viewAllAcitveBtn}` : '')} onClick={viewAllToggle} size="large">
						이번 주
					</Btn>
				</div> */}
				<RoutineNav
					changeWeek={changeWeek}
					routineToggle={routineToggle}
					onAdd={onAdd}
					borderController={borderController}
					routinesAndEtcController={routinesAndEtcController}
					getRoutine={getRoutine}
					today={today}
					getRoutineActive={getRoutineActive}
				/>
				<CurrentWeekTap currentWeekController={currentWeekController} />
				<ToDoList getRoutine={getRoutine} />
			</MainContainer>
		</>
	);
};

export default Main;
