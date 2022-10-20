import { getCurrentWeekByDate, getCurrentWeekByLocal } from '../common/utils';

interface ICurrentWeekProps {
	getRoutinesByDateData: (date?: string) => void;
	active: number;
	moveDistance: number;
	handleClickTab: (index: number) => void;
}

const CurrentWeek = ({
	getRoutinesByDateData,
	active,
	moveDistance,
	handleClickTab,
}: ICurrentWeekProps) => {
	const dayArr = ['월', '화', '수', '목', '금', '토', '일'];
	const handleClickDay = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const {
			currentTarget: {
				dataset: { day },
			},
		} = e;
		getRoutinesByDateData(day);
	};

	return (
		<div className="w-3/4 pt-10 mx-auto border-b-2 border-gray-100 border-solid ">
			<ul className="relative flex flex-wrap items-center text-center currentWeek">
				{getCurrentWeekByLocal().map((it: string, index) => {
					return (
						<li
							className={`px-5 py-2 w-[14.285%] hover:bg-gray-200 ${
								active === index ? 'day dayActiveBtn' : 'day'
							}`}
							data-day={getCurrentWeekByDate()[index]}
							key={it}
							onClick={e => {
								handleClickDay(e);
								handleClickTab(index);
							}}
						>
							<div className="text-sm text-gray-400">{dayArr[index]}</div>
							<div className="font-medium">{it}</div>
						</li>
					);
				})}
				<span
					className="border"
					style={{
						transform: `translateX(${moveDistance}%)`,
						transition: '.5s',
					}}
				/>
			</ul>
		</div>
	);
};

export default CurrentWeek;
