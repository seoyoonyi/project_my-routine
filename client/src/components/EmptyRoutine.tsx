import { CalendarX2 } from 'lucide-react';
import React from 'react';

const EmptyRoutine = () => {
	return (
		<div className="pt-16 pb-10 text-center">
			<div className="flex justify-center pb-3 align-center">
				<CalendarX2 className="text-gray-400 " size={50} strokeWidth={1} />
			</div>
			<h2 className="text-lg text-gray-500">해당날짜에 루틴이 없습니다</h2>
			<p className="text-sm text-gray-400">루틴을 만들어 뿌듯한 하루를 만들어보아요</p>
		</div>
	);
};

export default EmptyRoutine;
