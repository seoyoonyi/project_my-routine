type FormatType = 'dash' | 'hyphen';

const setDefaultDate = (type: FormatType) => {
	const day = new Date();

	let dayOfWeek = day.getDay();
	if (day.getDay() === 0) {
		// 현재 날짜를 기준으로 이번주 시작일 조정
		dayOfWeek = day.getDay() + 6;
	}

	const sunday = day.getTime() - 86400000 * dayOfWeek;
	day.setTime(sunday);

	const result = [];
	for (let i = 1; i < 8; i++) {
		day.setTime(day.getTime() + 86400000);
		const optType = type;

		const formatByDash = day.toISOString().slice(0, 10);
		const splittedDay = day.toISOString().slice(0, 10).split('-');
		const formatByHyphen = splittedDay[1] + '/' + splittedDay[2];

		optType === 'dash' ? result.push(formatByDash) : result.push(formatByHyphen);
	}

	return result;
};

export const getStringDate = (date: Date) => {
	return date.toISOString().slice(0, 10);
};

export const getCurrentWeekByDash = () => {
	return setDefaultDate('dash');
};

export const getCurrentWeekByHyphen = () => {
	return setDefaultDate('hyphen');
};
