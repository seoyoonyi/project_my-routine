import { Modal, Dropdown, Menu, Input } from 'antd';
import type { MenuProps } from 'antd';
import { useContext, useState } from 'react';
import { IRoutineListProps } from './RoutineList';
import Btn from './Btn';
import { RoutineControllerContext } from '../common/context/APIControllerProvider';
import useRoutines from '../common/hooks/use-routines';

interface IRoutineModal {
	isModalOpen: boolean;
	routineItem: IRoutineListProps;
	handleCancel: () => void;
}

const RoutineModal = ({ isModalOpen, routineItem, handleCancel }: IRoutineModal) => {
	const { getRoutine } = useRoutines();
	const { id, title, content, date, activeStatus, timeStatus } = routineItem;
	const [menuKey, setMenuKey] = useState<string>('');
	const [originData, setOriginData] = useState({ title, content, date, activeStatus, timeStatus });
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isEditDate, setIsEditDate] = useState<boolean>(false);
	const routineController = useContext(RoutineControllerContext);

	const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.currentTarget;
		setOriginData({
			...originData,
			[name]: value,
		});
	};

	const toggleIsEdit = () => setIsEdit(!isEdit);
	const handleQuitEdit = () => {
		setIsEdit(false);
		setOriginData({ title, content, date, activeStatus, timeStatus });
	};
	const EditRoutineData = async () => {
		await routineController.editRoutine(
			id,
			originData.title,
			originData.content,
			originData.date,
			originData.activeStatus,
			originData.timeStatus,
		);

		getRoutine(originData.date);
	};

	const toggleIsEditDate = () => setIsEditDate(!isEditDate);

	const removeRoutineData = async () => {
		await routineController.removeRoutine(id);
		handleCancel();

		getRoutine(originData.date);
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
						removeRoutineData();
					},
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
						<p>{activeStatus}</p>
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
