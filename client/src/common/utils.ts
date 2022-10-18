export const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getCurrentWeekByDate = () => {
  const day = new Date();
  const sunday = day.getTime() - day.getDay() - 86400000;

  day.setTime(sunday);

  const result = [day.toISOString().slice(0, 10)];

  for (let i = 1; i < 7; i++) {
    day.setTime(day.getTime() + 86400000);
    result.push(day.toISOString().slice(0, 10));
  }

  return result;
};

export const getCurrentWeekByLocal = () => {
  const day = new Date();
  const sunday = day.getTime() - 86400000 * day.getDay();

  day.setTime(sunday);

  const result = [day.toISOString().slice(0, 10)];

  for (let i = 1; i < 8; i++) {
    day.setTime(day.getTime() + 86400000);

    result.push(day.getFullYear() + '년 ' + (day.getMonth() + 1) + '월 ' + day.getDate() + '일');
  }
  result.shift();

  return result;
};
