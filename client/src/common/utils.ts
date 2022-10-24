type FormatType = 'dash' | 'hyphen';

const day = new Date();

const setDefaultDate = (option: { type: FormatType; index: number }) => {
	const monday = day.getTime() - 86400000 * (day.getDay() + 6);

	day.setTime(monday);
	const result = [day.toISOString().slice(0, 10)];
	for (let i = 1; i < option.index; i++) {
		day.setTime(day.getTime() + 86400000);
		const optType = option.type;
		const dashResult = day.toISOString().slice(0, 10);
		const hyphenResult = day.getMonth() + 1 + '/' + (day.getDate() - 1);
		optType === 'dash' ? result.push(dashResult) : result.push(hyphenResult);
	}
	return result;
};

export const getStringDate = (date: Date) => {
	return date.toISOString().slice(0, 10);
};

export const getCurrentWeekByDash = () => {
	return setDefaultDate({ type: 'dash', index: 7 });
};

export const getCurrentWeekByHyphen = () => {
	const result = setDefaultDate({ type: 'hyphen', index: 8 });
	result.shift();
	return result;
};
