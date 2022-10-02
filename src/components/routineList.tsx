import { useContext, useState } from 'react';
import RoutineItem from './routineItem';
import { RoutineStateContext, IDataType } from '../context/routineStateContext';
import RoutineModal from '../pages/routineModal';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
import { Button, Modal } from 'antd';

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

  const { title, content, date } = routineItem;

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

      {/* {isOpen && <RoutineModal />} */}
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      {isModalOpen && (
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{title}</p>
          <p>{content}</p>
          <p>{date}</p>
        </Modal>
      )}
    </>
  );
};

export default RoutineList;
