import { IDataType } from '../context/routineStateContext';
import { Modal } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown, Menu } from 'antd';
import { useContext, useState } from 'react';
import { RoutineDispatchContext } from '../context/routineDispatchContext';

interface IRoutineModal {
  isModalOpen: boolean;
  routineItem: IDataType;
  handleOk: () => void;
  handleCancel: () => void;
}

const RoutineModal = ({
  isModalOpen,
  routineItem,
  handleOk,
  handleCancel,
}: IRoutineModal) => {
  const { id, title, content, date } = routineItem;
  const [menuKey, setMenuKey] = useState<string>('');
  const { onRemove } = useContext(RoutineDispatchContext);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const dropDownId = e.key;
    setMenuKey(dropDownId);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'delete',
          key: '1',
          onClick: () => {
            onRemove(id);
            console.log(id);
            console.log('삭제');
          },
        },
        {
          label: '2nd menu item',
          key: '2',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );
  const dropDown = (
    <Dropdown.Button
      key={menuKey}
      overlay={menu}
      trigger={['click']}
      className="dropdown"
      type="text"
    ></Dropdown.Button>
  );

  return (
    <>
      <Modal
        title={[title, dropDown]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{content}</p>
        <p>{date}</p>
      </Modal>
    </>
  );
};

export default RoutineModal;
