import { useEffect, useState, useCallback } from 'react';
import RoutineList from '../components/RoutineList';
import Btn from '../components/Btn';
import RoutineEditor from '../components/RoutineEditor';
import { IAppProps } from '../App';
import Header from '../components/Header';
import CurrentWeek from '../components/CurrentWeek';
import { getCurrentWeekByDate, getStringDate } from '../common/utils';

export interface IRoutine {
	id: number;
	title: string;
	content: string;
	date: string;
}

const Main = ({ routineController }: IAppProps) => {
	const today = getStringDate(new Date());
	const numIndex = getCurrentWeekByDate().findIndex((it: string) => it === today);
	const [active, setActive] = useState<number>(numIndex);
	const [moveDistance, setMoveDistance] = useState(0);
	const [routineList, setRoutineList] = useState<IRoutine[]>([]);
	const [onAdd, setOnAdd] = useState(false);
	const [viewAll, setViewAll] = useState(false);

	const routineToggle = () => {
		setOnAdd(onAdd => !onAdd);
	};

	const getRoutinesData = useCallback(async () => {
		const response = await routineController.getRoutines();
		setRoutineList(response.data);
	}, [routineController]);

	const getRoutinesByDateData = useCallback(
		async (date?: string) => {
			if (!date) {
				return;
			}
			const response = await routineController.getRoutinesByDate(date);

			setRoutineList(response.data);
		},
		[routineController],
	);

	const borderActive = (index: number) => {
		setMoveDistance(100 * index);
	};

	const handleClickTab = (index: number) => {
		setActive(index);
		borderActive(index);
	};

	const viewAllToggle = () => {
		setViewAll(viewAll => !viewAll);
		!viewAll ? getRoutinesData() : getRoutinesByDateData(today);
		borderActive(numIndex);
		setActive(numIndex);
	};

	useEffect(() => {
		getRoutinesByDateData(today);
		borderActive(numIndex);
	}, [getRoutinesByDateData, numIndex, today]);

	return (
		<>
			<Header />
			<div className="max-w-6xl px-4 mx-auto sm:px-6">
				<div className="pt-40 pb-12 md:pt-40 md:pb-20">
					<div className="w-3/4 pt-10 mx-auto">
						<Btn
							className={viewAll ? 'viewAll viewAllAcitveBtn' : 'viewAll'}
							onClick={viewAllToggle}
						>
							모든 요일의 루틴보기
						</Btn>
						{onAdd ? (
							<RoutineEditor
								getRoutinesData={getRoutinesData}
								routineToggle={routineToggle}
								routineController={routineController}
							/>
						) : (
							<Btn onClick={routineToggle}>루틴추가하기</Btn>
						)}
					</div>
					<CurrentWeek
						getRoutinesByDateData={getRoutinesByDateData}
						active={active}
						moveDistance={moveDistance}
						handleClickTab={handleClickTab}
					/>

					<div className="w-3/4 pt-10 mx-auto ">
						{routineList
							.map((it: IRoutine) => {
								return (
									<RoutineList
										key={it.id}
										{...it}
										routineController={routineController}
										getRoutinesData={getRoutinesData}
									/>
								);
							})
							.reverse()}
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
