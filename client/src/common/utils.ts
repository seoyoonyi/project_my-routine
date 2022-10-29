type FormatType = "dash" | "hyphen";

const setDefaultDate = (type: FormatType) => {
  const day = new Date();
  const sunday = day.getTime() - 86400000 * day.getDay();

  day.setTime(sunday);
  const result = [];
  for (let i = 1; i < 8; i++) {
    day.setTime(day.getTime() + 86400000);
    const optType = type;

    const formatByDash = day.toISOString().slice(0, 10);
    const formatByHyphen = day.getMonth() + 1 + "/" + day.getDate();

    optType === "dash"
      ? result.push(formatByDash)
      : result.push(formatByHyphen);
  }

  return result;
};

export const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getCurrentWeekByDash = () => {
  return setDefaultDate("dash");
};

export const getCurrentWeekByHyphen = () => {
  return setDefaultDate("hyphen");
};
