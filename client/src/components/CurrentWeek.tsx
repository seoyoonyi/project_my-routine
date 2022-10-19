import React from 'react';
import { getCurrentWeekByDate, getCurrentWeekByLocal } from '../common/utils';

const CurrentWeek = () => {
  return (
    <div className="w-3/4 mx-auto">
      <ul className="flex items-center justify-between currentWeek">
        {getCurrentWeekByLocal().map((it: string, index) => {
          return (
            <li data-day={getCurrentWeekByDate()[index]} key={it}>
              {it}
            </li>
          );
        })}
      </ul>
      <ul className="flex items-center justify-between px-[15px] dayList">
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
        <li>일</li>
      </ul>
    </div>
  );
};

export default CurrentWeek;
