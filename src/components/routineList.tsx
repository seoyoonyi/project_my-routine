import { useContext, useState } from 'react';
import RoutineItem from './routineItem';
import { RoutineStateContext, IDataType } from '../context/routineStateContext';
import RoutineModal from '../pages/routineModal';

const RoutineList = () => {
  const routinelist = useContext(RoutineStateContext);
  // const { isOpen } = useContext(RoutineDispatchContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [routineItem, setRoutineItem] = useState<IDataType>({
    id: 0,
    title: '',
    content: '',
    date: '',
  });

  const showModal = (item: IDataType) => {
    setIsModalOpen(true);
    setRoutineItem(item);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {routinelist.map((it: IDataType) => (
        <RoutineItem key={it.id} {...it} showModal={showModal} />
      ))}

      {isModalOpen && (
        <RoutineModal
          isModalOpen={isModalOpen}
          routineItem={routineItem}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
};

export default RoutineList;
