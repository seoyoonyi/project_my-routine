import { getCurrentWeekByDate, getCurrentWeekByLocal } from '../common/utils';

interface ICurrentWeekProps {
  getRoutinesByDateData: (date?: string) => void;
}

const CurrentWeek = ({ getRoutinesByDateData }: ICurrentWeekProps) => {
  const handleClickDay = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const {
      currentTarget: {
        dataset: { day },
      },
    } = e;
    getRoutinesByDateData(day);
  };

  const dayArr = ['월', '화', '수', '목', '금', '토', '일'];
  return (
    <div className="w-3/4 mx-auto">
      <ul className="flex flex-wrap items-center justify-between text-center currentWeek">
        {getCurrentWeekByLocal().map((it: string, index) => {
          return (
            <li className="px-5 py-2 hover:bg-sky-500/50 " data-day={getCurrentWeekByDate()[index]} key={it} onClick={handleClickDay}>
              <div>{it}</div>
              <div>{dayArr[index]}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CurrentWeek;
