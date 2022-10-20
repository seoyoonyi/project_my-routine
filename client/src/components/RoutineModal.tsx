import { Modal, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { IRoutineListProps } from './RoutineList';
import Btn from './Btn';
import Input from 'antd/lib/input/Input';

interface IRoutineModal {
	isModalOpen: boolean;
	routineItem: IRoutineListProps;
	handleCancel: () => void;
}

const RoutineModal = ({ isModalOpen, routineItem, handleCancel }: IRoutineModal) => {
	const { id, title, content, date, routineController, getRoutinesData } = routineItem;
	const [menuKey, setMenuKey] = useState<string>('');
	const [originData, setOriginData] = useState({ title, content, date });
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isEditDate, setIsEditDate] = useState<boolean>(false);

	//수정 기능 - 공통
	const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.currentTarget;
		setOriginData({
			...originData,
			[name]: value,
		});
	};
	//수정 기능 - 타이틀, 콘텐츠
	const toggleIsEdit = () => setIsEdit(!isEdit);
	const handleQuitEdit = () => {
		setIsEdit(false);
		setOriginData({ title, content, date });
	};
	const EditRoutineData = async () => {
		await routineController.editRoutine(id, originData.title, originData.content, originData.date);
		getRoutinesData();
	};
	//수정기능 - 날짜
	const toggleIsEditDate = () => setIsEditDate(!isEditDate);

	//삭제 기능
	const removeRoutineData = async () => {
		await routineController.removeRoutine(id);
		handleCancel();
		getRoutinesData();
	};
	const handleMenuClick: MenuProps['onClick'] = e => {
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
						removeRoutineData();
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
		/>
	);

	return (
		<>
			<Modal title={[dropDown]} open={isModalOpen} onCancel={handleCancel} footer={null}>
				{isEdit ? (
					<>
						<input name="title" defaultValue={title} onChange={handleChangeEdit} />
						<br />
						<textarea name="content" defaultValue={content} onChange={handleChangeEdit} />
						<br />
						<Btn onClick={handleQuitEdit}>취소</Btn>
						<Btn
							onClick={() => {
								EditRoutineData();
								toggleIsEdit();
							}}
						>
							저장
						</Btn>
					</>
				) : (
					<>
						<h2 onClick={toggleIsEdit}>{title}</h2>
						<p onClick={toggleIsEdit}>{content}</p>
					</>
				)}
				{isEditDate ? (
					<>
						<Input type="date" name="date" onChange={handleChangeEdit} defaultValue={date} />
						<Btn
							onClick={() => {
								EditRoutineData();
								toggleIsEditDate();
							}}
						>
							저장
						</Btn>
					</>
				) : (
					<p onClick={toggleIsEditDate}>{originData.date}</p>
				)}
			</Modal>
		</>
	);
};

export default RoutineModal;
