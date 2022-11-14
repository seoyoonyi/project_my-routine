import { useState } from 'react';
import { ActiveStatus, TimeStatus } from '../common/type/type';
import RoutineModal from './RoutineModal';
import RoutineItem from './RoutineItem';

export interface IRoutineListProps {
	id: number;
	title: string;
	content: string;
	date: string;
	activeStatus: ActiveStatus;
	timeStatus: TimeStatus;
	getRoutine: (date?: string) => void;
}

const RoutineList = (routineItem: IRoutineListProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [activeStatus, setActiveStatus] = useState<ActiveStatus>(routineItem.activeStatus);
	const { getRoutine } = routineItem;

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<RoutineItem {...routineItem} showModal={showModal} activeStatus={activeStatus} setActiveStatus={setActiveStatus} />

			{isModalOpen && <RoutineModal routineItem={routineItem} isModalOpen={isModalOpen} handleCancel={handleCancel} getRoutine={getRoutine} />}
		</>
	);
};

export default RoutineList;
