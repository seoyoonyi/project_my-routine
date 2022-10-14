import { IDataType } from '../context/routineStateContext';
import { Modal, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useContext, useRef, useState } from 'react';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
import Btn from '../components/btn';

interface IRoutineModal {
  isModalOpen: boolean;
  routineItem: IDataType;
  handleOk: () => void;
  handleCancel: () => void;
}

const RoutineModal = ({ isModalOpen, routineItem, handleOk, handleCancel }: IRoutineModal) => {
  const { id, title, content, date } = routineItem;
  const [menuKey, setMenuKey] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditDate, setIsEditDate] = useState<boolean>(false);
  const [originData, setOriginData] = useState(routineItem);
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);
  const { memoizedDispatches } = useContext(RoutineDispatchContext);
  const { onRemove, onEdit } = memoizedDispatches;
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const toggleIsEditDate = () => setIsEditDate(!isEditDate);
  const handleQuitEidt = () => {
    setIsEdit(false);
    setOriginData(routineItem);
  };
  const handleEdit = () => {
    onEdit(id, originData.title, originData.content, originData.date);
    toggleIsEdit();
  };

  const handleEditDate = () => {
    onEdit(id, originData.title, originData.content, originData.date);
    toggleIsEditDate();
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOriginData({
      ...originData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

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
            handleCancel();
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
  const dropDown = <Dropdown.Button key={menuKey} overlay={menu} trigger={['click']} className="dropdown" type="text"></Dropdown.Button>;

  return (
    <>
      <Modal title={[dropDown]} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        {isEdit ? (
          <>
            <input ref={titleInput} name="title" defaultValue={title} onChange={handleChangeEdit} />
            <br />
            <textarea ref={contentInput} name="content" defaultValue={content} onChange={handleChangeEdit}></textarea>
            <br />
            <Btn onClick={handleQuitEidt} text={'취소'} />
            <Btn onClick={handleEdit} text={'저장'} />
          </>
        ) : (
          <>
            <h2 onClick={toggleIsEdit}>{originData.title}</h2>
            <p onClick={toggleIsEdit}>{originData.content}</p>
          </>
        )}
        <br />
        {isEditDate ? (
          <>
            <input type="date" name="date" onChange={handleChangeEdit} defaultValue={date} />
            <Btn onClick={handleEditDate} text={'저장'} />
          </>
        ) : (
          <p onClick={toggleIsEditDate}>{originData.date}</p>
        )}
        <br />
      </Modal>
    </>
  );
};

export default RoutineModal;
