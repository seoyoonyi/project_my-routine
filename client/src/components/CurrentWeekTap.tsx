import { useMemo } from 'react';
import useRoutines from '../common/hooks/use-routines';
import { getCurrentWeekByDash } from '../common/utils/utils';
import styles from './CurrentWeekTap.module.css';

interface ICurrentWeekProps {
	onBorder: boolean;
	dayNumber: number;
	moveDistance: number;
}

const CurrentWeekTap = ({ onBorder, dayNumber, moveDistance }: ICurrentWeekProps) => {
	const { getRoutine, active, currentWeek } = useRoutines({ dayNumber });

	const currentWeekbyDash = useMemo(() => getCurrentWeekByDash(dayNumber), [dayNumber]);
	const dayArr = ['월', '화', '수', '목', '금', '토', '일'];
	const handleClickDay = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const {
			currentTarget: {
				dataset: { day },
			},
		} = e;

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
