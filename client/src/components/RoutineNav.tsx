import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import useRoutines from '../common/hooks/use-routines';

import Btn from './Btn';
import DropDown from './DropDown';
import RoutineEditor from './RoutineEditor';
interface IRoutineNavType {
	changeWeek: (btnValue: number) => void;
	onAdd: boolean;
	routineToggle: () => void;
	ActiveStatusTolggle: () => void;
}

const RoutineNav = ({ changeWeek, onAdd, routineToggle, ActiveStatusTolggle }: IRoutineNavType) => {
	const { getRoutine } = useRoutines();
	const { today, onBorder, setOnBorder } = useContext(RoutineContext);
	const [onWeek, setOnWeek] = useState<boolean>(false);
	const weekToggle = () => {
		setOnWeek(false);
		getRoutine(today);
		setOnBorder(!onBorder);
	};
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
				<div className="flex items-center justify-between h-full">
					{onWeek && (
						<Btn size="small" type="dashed" className="flex items-center mr-4 rounded-md" onClick={weekToggle}>
							<X size={16} color="#B5B5B5" />
							<span className="text-xs text-gray-400">이번주</span>
						</Btn>
					)}
					<div className="mr-2">
						<Btn onClick={routineToggle}>루틴 추가하기</Btn>
						{onAdd && <RoutineEditor routineToggle={routineToggle} onAdd={onAdd} />}
					</div>
					<DropDown ActiveStatusTolggle={ActiveStatusTolggle} onWeek={onWeek} setOnWeek={setOnWeek}></DropDown>
				</div>
			</div>
		</div>
	);
};

export default RoutineNav;
