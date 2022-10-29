import { useMemo } from "react";
import { getCurrentWeekByHyphen } from "../common/utils";

interface ICurrentWeekProps {
  dayIndex: string[];
  getRoutine: (date?: string) => void;
  active: number | null;
  moveDistance: number | null;
  handleClickTab: (index: number) => void;
  onBorder: boolean;
}

const CurrentWeekTap = ({
  dayIndex,
  getRoutine,
  active,
  moveDistance,
  handleClickTab,
  onBorder,
}: ICurrentWeekProps) => {
  const currentWeekbyHyphen = useMemo(() => getCurrentWeekByHyphen(), []);
  const dayArr = ["월", "화", "수", "목", "금", "토", "일"];
  const handleClickDay = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const {
      currentTarget: {
        dataset: { day },
      },
    } = e;
    getRoutine(day);
  };

  return (
    <div className="pt-10 border-b-2 border-gray-100 border-solid ">
      <ul className="relative flex flex-wrap items-center text-center currentWeek">
        {currentWeekbyHyphen.map((it: string, index) => {
          return (
            <li
              className={`px-5 py-2 w-[14.285%] hover:bg-gray-200 ${
                active === index ? "day dayActiveBtn" : "day"
              }`}
              data-day={dayIndex[index]}
              key={it}
              onClick={(e) => {
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
          className={onBorder ? undefined : "dayBorder"}
          style={{
            transform: `translateX(${moveDistance}%)`,
            transition: ".5s",
          }}
        />
      </ul>
    </div>
  );
};

export default CurrentWeekTap;
