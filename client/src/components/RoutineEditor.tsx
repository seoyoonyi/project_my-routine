import React, { useContext, useEffect, useRef, useState } from 'react';
import Btn from './Btn';
import { getStringDate } from '../common/utils/utils';
import { Modal, Input, Form, InputRef, Radio } from 'antd';
import { ActiveStatus, TimeStatus } from '../common/type/type';
import RoutineControllerContext from '../common/context/RoutineControllerContext';
import styles from './RoutineEditor.module.css';
import TextArea from 'antd/lib/input/TextArea';
import useRoutines from '../common/hooks/use-routines';
interface IRoutineEditorProps {
	routineToggle: () => void;
	onAdd: boolean;
}
export interface IRoutineDataType {
	title: string;
	content: string;
	date: string;
	activeStatus: ActiveStatus;
	timeStatus: TimeStatus;
}

const RoutineEditor = ({ routineToggle, onAdd }: IRoutineEditorProps) => {
	const { getRoutine } = useRoutines();
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const [timeStatus, setTimeStatus] = useState('');

	const titleInput = useRef<InputRef>(null);
	const contentInput = useRef<HTMLTextAreaElement>(null);
	const routineController = useContext(RoutineControllerContext);

	// To disable submit button at the beginning.
	useEffect(() => {
		forceUpdate({});
	}, []);

	useEffect(() => {
		form.setFieldsValue({
			title: '',
			content: '',
			date: getStringDate(),
			activeStatus: 'DO',
			timeStatus: '',
		});
	}, [form]);

	const routineSave = () => routineToggle();

	const addRoutineData = async () => {
		const { title, content, date, activeStatus, timeStatus } = form.getFieldsValue(['title', 'content', 'date', 'activeStatus', 'timeStatus']);
		await routineController.addRoutine(title, content, date, activeStatus, timeStatus);
		getRoutine(date);
	};

	const handleSubmit = () => {
		addRoutineData();
		routineSave();
	};

	const onTimeStatusChange = ({ timeStatus }: { timeStatus: TimeStatus }) => {
		setTimeStatus(timeStatus);
	};

	return (
		<Modal open={onAdd} onCancel={routineToggle} footer={null}>
			<Form
				form={form}
				name="horizontal_login"
				layout="inline"
				onFinish={handleSubmit}
				className={styles.editorForm}
				initialValues={{ timeStatus }}
				onValuesChange={onTimeStatusChange}
			>
				<div className={styles.titleInputBox}>
					<Form.Item name="title" rules={[{ required: true }]}>
						<Input ref={titleInput} name="title" className={styles.titleInput} placeholder="작업이름" />
					</Form.Item>
				</div>
				<div className={styles.contentBox}>
					<Form.Item name="content" rules={[{ required: true }]}>
						<TextArea ref={contentInput} name="content" className={styles.contentTextArea} placeholder="추가한 이유(150자 이내)" />
					</Form.Item>
				</div>
				<div className={styles.routineStartBox}>
					<p>루틴 시작일</p>
					<Form.Item name="date" rules={[{ required: true }]}>
						<Input type="date" />
					</Form.Item>
				</div>
				<div className={styles.routineStartBox}>
					<p>시간필터</p>
					<Form.Item name="timeStatus" rules={[{ required: true }]}>
						<Radio.Group>
							<Radio.Button value="아침">아침</Radio.Button>
							<Radio.Button value="오후">오후</Radio.Button>
							<Radio.Button value="저녁">저녁</Radio.Button>
						</Radio.Group>
					</Form.Item>
				</div>
				{/* 앞에꺼 동작후 만들기 */}
				{/* <div className={styles.routineStartBox}>
					<p>언제시작</p>
					<div>
						<input type="text" />
					</div>
				</div> */}
				<Form.Item shouldUpdate>
					{() => (
						<Btn
							type="primary"
							htmlType="submit"
							disabled={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length}
						>
							루틴저장
						</Btn>
					)}
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RoutineEditor;
