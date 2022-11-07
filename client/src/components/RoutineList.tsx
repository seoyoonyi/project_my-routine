import { useState } from 'react';
import { StatusType } from '../common/type/type';
import RoutineModal from './RoutineModal';
import RoutineItem from './RoutineItem';
import RoutineClient from '../service/routine-client';

export interface IRoutineListProps {
	id: number;
	title: string;
	content: string;
	date: string;
	status: StatusType;
	routineController: RoutineClient;
	getAllRoutines: () => void;
}

const RoutineList = (routineItem: IRoutineListProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [status, setStatus] = useState<StatusType>(routineItem.status);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<RoutineItem {...routineItem} showModal={showModal} status={status} setStatus={setStatus} />

			{isModalOpen && (
				<RoutineModal
					isModalOpen={isModalOpen}
					routineItem={routineItem}
					handleCancel={handleCancel}
				/>
			)}
		</>
	);
};

export default RoutineList;
