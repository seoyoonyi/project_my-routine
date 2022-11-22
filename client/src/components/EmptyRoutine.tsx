import { CalendarX2 } from 'lucide-react';
import React from 'react';

const EmptyRoutine = () => {
	return (
		<div className="pt-20 text-center">
			<div className="flex justify-center pb-3 align-center">
				<CalendarX2 className="text-gray-400 " size={50} strokeWidth={1} />
			</div>
			<h2 className="text-lg text-gray-500">루틴이 없습니다</h2>
			<p className="text-sm text-gray-400">해당 날짜에 만들어진 루틴이 없습니다</p>
		</div>
	);
};

export default EmptyRoutine;
