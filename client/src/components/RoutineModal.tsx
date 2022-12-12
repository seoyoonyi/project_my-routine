import { Modal, Dropdown, Input, Form, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useContext, useState } from 'react';
import { IRoutineListProps } from './RoutineList';
import Btn from './Btn';
import { RoutineControllerContext } from '../common/context/APIControllerProvider';
import useRoutines from '../common/hooks/use-routines';
import styles from './RoutineModal.module.css';

interface IRoutineModal {
	isModalOpen: boolean;
	routineItem: IRoutineListProps;
	handleCancel: () => void;
}

const RoutineModal = ({ isModalOpen, routineItem, handleCancel }: IRoutineModal) => {
	const { getRoutine } = useRoutines();
	const { id, title, content, date, timeStatus } = routineItem;
	const routineController = useContext(RoutineControllerContext);
	const [form] = Form.useForm();
	const [menuKey] = useState<string>('');
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isEditDate, setIsEditDate] = useState<boolean>(false);
	const [isEditTimeStatus, setIsEditTimeStatus] = useState<boolean>(false);

	const toggleIsEdit = () => setIsEdit((pre) => !pre);
	const toggleIsEditDate = () => setIsEditDate((pre) => !pre);
	const toggleIsEditTimeStatus = () => setIsEditTimeStatus((pre) => !pre);

	const EditRoutineData = async () => {
		const { title, content, date, activeStatus, timeStatus } = form.getFieldsValue([
			'title',
			'content',
			'date',
			'activeStatus',
			'timeStatus',
		]);

		await routineController.editRoutine(id, title, content, date, activeStatus, timeStatus);

		getRoutine(date);
	};

	const removeRoutineData = async () => {
		const { date } = form.getFieldsValue(['date']);

		await routineController.removeRoutine(id);

		handleCancel();
		getRoutine(date);
	};

	const items = [
		{
			label: 'delete',
			key: '1',
			onClick: () => {
				removeRoutineData();
			},
		},
	];

	const dropDown = (
		<Dropdown.Button
			key={menuKey}
			menu={{ items }}
			trigger={['click']}
			className="dropdown"
			type="text"
		/>
	);

	return (
		<>
			<Modal
				className={styles.modalBox}
				title={[dropDown]}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					form={form}
					name="routine_Modal"
					layout="inline"
					className={styles.formBox}
					initialValues={{
						title,
						content,
						date,
						timeStatus,
					}}
				>
					{isEdit ? (
						<>
							<div className={styles.inputGroup}>
								<div className={styles.titleInputBox}>
									<Form.Item name="title">
										<Input
											name="title"
											className={styles.titleInput}
											placeholder="작업이름"
											required
										/>
									</Form.Item>
								</div>
								<div className={styles.contentTextAreaBox}>
									<Form.Item name="content">
										<TextArea
											name="content"
											className={styles.contentTextArea}
											placeholder="추가한 이유(150자 이내)"
											required
										/>
									</Form.Item>
								</div>
							</div>
							<div className={styles.btnGroup}>
								<Btn onClick={() => setIsEdit(false)}>취소</Btn>
								<Btn
									type="primary"
									onClick={() => {
										EditRoutineData();
										toggleIsEdit();
									}}
								>
									저장
								</Btn>
							</div>
						</>
					) : (
						<div className={styles.titleContentBox}>
							<h2 onClick={toggleIsEdit}>{title}</h2>
							<p onClick={toggleIsEdit}>{content}</p>
						</div>
					)}
					{isEditDate ? (
						<div className={styles.routineStartBox}>
							<p>루틴 시작일</p>
							<Form.Item name="date" rules={[{ required: true }]}>
								<Input
									type="date"
									name="date"
									onChange={() => {
										EditRoutineData();
										toggleIsEditDate();
									}}
								/>
							</Form.Item>
						</div>
					) : (
						<div className={styles.routineStartBox} onClick={toggleIsEditDate}>
							<p>루틴 시작일</p>
							<p>{date}</p>
						</div>
					)}

					{isEditTimeStatus ? (
						<div className={styles.routineStartBox}>
							<p>시간필터</p>
							<Form.Item name="timeStatus" rules={[{ required: true }]}>
								<Radio.Group
									onChange={() => {
										EditRoutineData();
										toggleIsEditTimeStatus();
									}}
								>
									<Radio.Button className={styles.timeStatusBtn} value="아침">
										아침
									</Radio.Button>
									<Radio.Button className={styles.timeStatusBtn} value="오후">
										오후
									</Radio.Button>
									<Radio.Button className={styles.timeStatusBtn} value="저녁">
										저녁
									</Radio.Button>
								</Radio.Group>
							</Form.Item>
						</div>
					) : (
						<div className={styles.routineStartBox} onClick={toggleIsEditTimeStatus}>
							<p>시간필터</p>
							<p>{timeStatus}</p>
						</div>
					)}
				</Form>
			</Modal>
		</>
	);
};

export default RoutineModal;
