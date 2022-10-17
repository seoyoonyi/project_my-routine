import { useState } from 'react';
import RoutineModal from './RoutineModal';
import RoutineItem from './RoutineItem';
import RoutineClient from '../service/routine-client';

export interface IRoutineListProps {
  id: number;
  title: string;
  content: string;
  date: string;
  routineController: RoutineClient;
  getRoutinesData: () => void;
}

const RoutineList = (routineItem: IRoutineListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <RoutineItem {...routineItem} showModal={showModal} />

      {isModalOpen && <RoutineModal isModalOpen={isModalOpen} routineItem={routineItem} handleCancel={handleCancel} />}
    </>
  );
};

export default RoutineList;
