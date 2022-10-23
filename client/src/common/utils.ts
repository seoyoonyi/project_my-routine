type FormatType = "dash" | "hyphen";

const day = new Date();

const setDefaultDate = (option: { type: FormatType; index: number }) => {
  const monday = day.getTime() - 86400000 * (day.getDay() + 6);

  day.setTime(monday);
  const result = [day.toISOString().slice(0, 10)];
  for (let i = 1; i < option.index; i++) {
    day.setTime(day.getTime() + 86400000);
    option.type === "dash"
      ? result.push(day.toISOString().slice(0, 10))
      : result.push(day.getMonth() + 1 + "/" + (day.getDate() - 1));
  }
  return result;
};

export const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getCurrentWeekByDash = () => {
  const result = setDefaultDate({ type: "dash", index: 7 });
  return result;
};

export const getCurrentWeekByHyphen = () => {
  const result = setDefaultDate({ type: "hyphen", index: 8 });
  result.shift();
  return result;
};
