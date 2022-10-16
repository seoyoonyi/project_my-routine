import { useState } from "react";
import RoutineModal from "./RoutineModal";
import RoutineItem from "./RoutineItem";

export interface IRoutineListProps {
  title: string;
  content: string;
  date: string;
}

const RoutineList = (routine: IRoutineListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <RoutineItem {...routine} showModal={showModal} />

      {isModalOpen && (
        <RoutineModal
          isModalOpen={isModalOpen}
          routineItem={routine}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
};

export default RoutineList;
