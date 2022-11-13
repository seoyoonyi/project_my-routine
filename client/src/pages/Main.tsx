import { useEffect, useState, useCallback, useMemo } from 'react';
import RoutineList from '../components/RoutineList';
import Btn from '../components/Btn';
import RoutineEditor from '../components/RoutineEditor';
import Header from '../components/Header';
import CurrentWeekTap from '../components/CurrentWeekTap';
import { getCurrentWeekByHyphen, getStringDate } from '../common/utils/utils';
import styles from './Main.module.css';
import MainContainer from '../components/MainContainer';
import { StatusType } from '../common/type/type';
import { useContext } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import RoutineControllerContext from '../common/context/RoutineControllerContext';

export interface IRoutine {
	id: number;
	title: string;
	content: string;
	date: string;
	status: StatusType;
}

const Main = () => {
	const today = getStringDate();
	const currentWeek = useMemo(() => getCurrentWeekByHyphen(), []);
	const dayIndex = currentWeek.findIndex((it: string) => it === today);
	const [active, setActive] = useState<number>(dayIndex || 0);
	const [moveDistance, setMoveDistance] = useState<number>(0);
	const [onAdd, setOnAdd] = useState<boolean>(false);
	const [onBorder, setOnBorder] = useState<boolean>(false);
	const routineController = useContext(RoutineControllerContext);
	const { routineContextList, setRoutineContextList, viewAll, setViewAll, getAllRoutines } = useContext(RoutineContext);

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
	const currentWeekController = { currentWeek, getRoutine, active, moveDistance, onBorder, setOnBorder };

	useEffect(() => {
		getRoutine(today);
	}, [getRoutine, today, dayIndex]);

	return (
		<>
			<Header />
			<MainContainer>
				<div className={styles.mainBtnGroup}>
					<Btn onClick={routineToggle} size="large">
						루틴 추가하기
					</Btn>
					{onAdd && <RoutineEditor borderController={borderController} routinesAndEtcController={routinesAndEtcController} />}

					<Btn className={'rounded-md' + (viewAll ? ` ${styles.viewAllAcitveBtn}` : '')} onClick={viewAllToggle} size="large">
						모든 요일의 루틴보기
					</Btn>
				</div>
				<CurrentWeekTap currentWeekController={currentWeekController} />

				{routineContextList
					.map((it: IRoutine) => {
						return <RoutineList key={it.id} {...it} getRoutine={getRoutine} />;
					})
					.reverse()}
			</MainContainer>
		</>
	);
};

export default Main;
