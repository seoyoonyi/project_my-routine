import { useEffect, useState, useCallback, useMemo } from 'react';
import RoutineList from '../components/RoutineList';
import Btn from '../components/Btn';
import RoutineEditor from '../components/RoutineEditor';
import Header from '../components/Header';
import CurrentWeekTap from '../components/CurrentWeekTap';
import { getCurrentWeekByDash, getStringDate } from '../common/utils/utils';
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
	const currentWeek = useMemo(() => getCurrentWeekByDash(), []);
	const dayIndex = currentWeek.findIndex((it: string) => it === today);
	const [active, setActive] = useState<number>(dayIndex || 0);
	const [moveDistance, setMoveDistance] = useState<number>(0);
	const [onAdd, setOnAdd] = useState<boolean>(false);
	const [viewAll, setViewAll] = useState<boolean>(false);
	const [onBorder, setOnBorder] = useState<boolean>(false);
	const routineController = useContext(RoutineControllerContext);
	const { routineContextList, setRoutineContextList, getAllRoutines } = useContext(RoutineContext);

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

	const handleClickTab = (index: number) => {
		setActive(index);
		borderActive(index);
	};

	const viewAllToggle = () => {
		setViewAll((viewAll) => !viewAll);
		if (!viewAll) {
			getAllRoutines();
			setActive(7);
			setOnBorder(!onBorder);
		} else {
			getRoutine(today);
			borderActive(dayIndex);
			setActive(dayIndex);
			setOnBorder(!onBorder);
		}
	};

	const viewController = { viewAll, setViewAll };
	const borderController = { onBorder, setOnBorder, borderActive };
	const routinesAndEtcController = { getRoutine, routineToggle, currentWeek, onAdd };

	useEffect(() => {
		getRoutine(today);
		borderActive(dayIndex);
	}, [getRoutine, today, dayIndex]);

	return (
		<>
			<Header />
			<MainContainer>
				<div className="flex justify-between mx-auto">
					<Btn onClick={routineToggle} size="large" className="rounded-md">
						루틴 추가하기
					</Btn>
					{onAdd && (
						<RoutineEditor
							viewController={viewController}
							borderController={borderController}
							routinesAndEtcController={routinesAndEtcController}
						/>
					)}

					<Btn
						className={'rounded-md' + (viewAll ? ` ${styles.viewAllAcitveBtn}` : '')}
						onClick={viewAllToggle}
						size="large"
					>
						모든 요일의 루틴보기
					</Btn>
				</div>
				<CurrentWeekTap
					dayIndex={currentWeek}
					getRoutine={getRoutine}
					active={active}
					moveDistance={moveDistance}
					handleClickTab={handleClickTab}
					onBorder={onBorder}
				/>

				<div className="mx-auto">
					{routineContextList
						.map((it: IRoutine) => {
							return (
								<RoutineList
									key={it.id}
									{...it}
									routineController={routineController}
									getAllRoutines={getAllRoutines} // RoutineModal까지 내려줌
								/>
							);
						})
						.reverse()}
				</div>
			</MainContainer>
		</>
	);
};

export default Main;
