import React, { useContext, useState } from 'react';
import Btn from '../components/btn';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
import { Button, Modal } from 'antd';

const RoutineModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {/* <h2>모달</h2>
      <Btn text={'X'} onClick={closeRoutineModal} /> */}
    </div>
  );
};

export default RoutineModal;
