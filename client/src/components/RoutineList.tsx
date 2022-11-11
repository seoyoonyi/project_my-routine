import { useState } from 'react';
import { StatusType } from '../common/type/type';
import RoutineModal from './RoutineModal';
import RoutineItem from './RoutineItem';

export interface IRoutineListProps {
	id: number;
	title: string;
	content: string;
	date: string;
	status: StatusType;
	getRoutine: (date?: string) => void;
}

const RoutineList = (routineItem: IRoutineListProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [status, setStatus] = useState<StatusType>(routineItem.status);
	const { getRoutine } = routineItem;
	const statusController = { status, setStatus };

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<RoutineItem {...routineItem} showModal={showModal} statusController={statusController} />

			{isModalOpen && <RoutineModal routineItem={routineItem} isModalOpen={isModalOpen} handleCancel={handleCancel} getRoutine={getRoutine} />}
		</>
	);
};

export default RoutineList;
