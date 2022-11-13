import { Dispatch, SetStateAction, useContext } from 'react';
import { useMemo } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import { getCurrentWeekByDash } from '../common/utils/utils';
import styles from './CurrentWeekTap.module.css';

interface ICurrentWeekProps {
	currentWeekController: {
		currentWeek: string[];
		getRoutine: (date?: string) => void;
		active: number | null;
		moveDistance: number | null;
		onBorder: boolean;
		setOnBorder: Dispatch<SetStateAction<boolean>>;
	};
}

const CurrentWeekTap = ({ currentWeekController }: ICurrentWeekProps) => {
	const { currentWeek, getRoutine, active, moveDistance, onBorder, setOnBorder } = currentWeekController;
	const { viewAll, setViewAll } = useContext(RoutineContext);
	const currentWeekbyDash = useMemo(() => getCurrentWeekByDash(), []);
	const dayArr = ['월', '화', '수', '목', '금', '토', '일'];
	const handleClickDay = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const {
			currentTarget: {
				dataset: { day },
			},
		} = e;
		if (viewAll) {
			setViewAll((viewAll) => !viewAll);
			setOnBorder(!onBorder);
		}
		getRoutine(day);
	};

	return (
		<ul className={styles.currentWeek}>
			{currentWeekbyDash.map((it: string, index) => {
				return (
					<li
						className={`px-5 py-2 w-[14.285%] hover:bg-gray-200 ${active === index ? 'day dayActiveBtn' : 'day'}`}
						data-day={currentWeek[index]}
						key={it}
						onClick={(e) => {
							handleClickDay(e);
						}}
					>
						<div className={styles.dayTxt}>{dayArr[index]}</div>
						<div className={styles.dateTxt}>{it}</div>
					</li>
				);
			})}
			<span
				className={onBorder ? undefined : 'dayBorder'}
				style={{
					transform: `translateX(${moveDistance}%)`,
					transition: '.5s',
				}}
			/>
		</ul>
	);
};

export default CurrentWeekTap;
