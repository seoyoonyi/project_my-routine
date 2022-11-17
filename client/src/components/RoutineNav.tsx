import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Btn from './Btn';
import DropDown from './DropDown';
import RoutineEditor from './RoutineEditor';
interface IRoutineNavType {
	changeWeek: (btnValue: number) => void;
	routineToggle: () => void;
	onAdd: boolean;
	getRoutine: () => Promise<void>;
	today: string;
	getRoutineActive: (activeStatus: string) => Promise<void>;
	borderController: {
		onBorder: boolean;
		setOnBorder: Dispatch<SetStateAction<boolean>>;
	};
	routinesAndEtcController: {
		getRoutine: (date: string) => void;
		routineToggle: () => void;
		onAdd: boolean;
	};
}

const RoutineNav = ({
	changeWeek,
	routineToggle,
	onAdd,
	borderController,
	routinesAndEtcController,
	getRoutine,
	today,
	getRoutineActive,
}: IRoutineNavType) => {
	return (
		<div>
			<div className="flex items-center justify-between h-8">
				<div className="flex items-center">
					<div className="flex mr-6 border rounded-md w-14 h-7">
						<Btn className="flex items-center justify-center w-1/2 h-full p-0 border-0 hover:bg-gray-100" onClick={() => changeWeek(-7)}>
							<ChevronLeft size={20} color="#B5B5B5" />
						</Btn>
						<Btn className="flex items-center justify-center w-1/2 h-full p-0 border-0 hover:bg-gray-100" onClick={() => changeWeek(7)}>
							<ChevronRight size={20} color="#B5B5B5" />
						</Btn>
					</div>

					<div className="flex items-center">
						<h2 className="mr-1 text-xl">2022 1월</h2>
						<ChevronDown size={20} color="#B5B5B5" />
					</div>
				</div>
				<div className="flex justify-between h-full">
					<div className="mr-2">
						<Btn onClick={routineToggle}>루틴 추가하기</Btn>
						{onAdd && <RoutineEditor borderController={borderController} routinesAndEtcController={routinesAndEtcController} />}
					</div>
					<DropDown getRoutine={getRoutine} today={today} getRoutineActive={getRoutineActive}></DropDown>
				</div>
			</div>
		</div>
	);
};

export default RoutineNav;
