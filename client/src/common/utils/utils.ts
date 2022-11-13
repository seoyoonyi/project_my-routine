type FormatType = 'dash' | 'hyphen';

const setDefaultDate = (type: FormatType) => {
	const day = getToday();

	let dayOfWeek = day.getDay();
	if (day.getDay() === 0) {
		// 현재 날짜를 기준으로 이번주 시작일 조정
		dayOfWeek = day.getDay() + 7;
	}

	const sunday = day.getTime() - 86400000 * dayOfWeek;
	day.setTime(sunday);

	const result = [];
	for (let i = 1; i < 8; i++) {
		day.setTime(day.getTime() + 86400000);
		const optType = type;

		const formatByHyphen = day.toISOString().slice(0, 10);
		const splittedDay = day.toISOString().slice(0, 10).split('-');
		const formatByDash = splittedDay[1] + '/' + splittedDay[2];

		optType === 'dash' ? result.push(formatByDash) : result.push(formatByHyphen);
	}

	return result;
};

export const getStringDate = () => {
	return getToday().toISOString().slice(0, 10);
};

export const getCurrentWeekByDash = () => {
	return setDefaultDate('dash');
};

export const getCurrentWeekByHyphen = () => {
	return setDefaultDate('hyphen');
};

export const getCurrentWeekByParam = () => {
	const currentWeek = getCurrentWeekByHyphen();
	const from = currentWeek.shift();
	const to = currentWeek.pop();
	return { from, to };
};
/* 
export const getWeekByNumber = (num: number) => {
	return setDefaultDate(num);
}; */

export const getToday = () => {
	// 한국시간으로 세팅
	const now = new Date();
	const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
	const koreaTimeDiff = 9 * 60 * 60 * 1000;
	return new Date(utcNow + koreaTimeDiff);
};
