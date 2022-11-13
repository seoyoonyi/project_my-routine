import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import Btn from './Btn';
import { getStringDate } from '../common/utils/utils';
import { Modal, Input, Form, InputRef } from 'antd';
import { StatusType } from '../common/type/type';
import RoutineControllerContext from '../common/context/RoutineControllerContext';
import { RoutineContext } from '../common/context/RoutineContext';
import styles from './RoutineEditor.module.css';
import TextArea from 'antd/lib/input/TextArea';
interface IRoutineEditorProps {
	borderController: {
		onBorder: boolean;
		setOnBorder: Dispatch<SetStateAction<boolean>>;
	};
	routinesAndEtcController: {
		getRoutine: (date: string) => void;
		routineToggle: () => void;
		onAdd: boolean;
	};
}
export interface IRoutineDataType {
	title: string;
	content: string;
	date: string;
	status: StatusType;
}

const RoutineEditor = ({ borderController, routinesAndEtcController }: IRoutineEditorProps) => {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const { onBorder, setOnBorder } = borderController;
	const { getRoutine, routineToggle, onAdd } = routinesAndEtcController;
	const titleInput = useRef<InputRef>(null);
	const contentInput = useRef<HTMLTextAreaElement>(null);
	const routineController = useContext(RoutineControllerContext);
	const { viewAll, setViewAll } = useContext(RoutineContext);

	// To disable submit button at the beginning.
	useEffect(() => {
		forceUpdate({});
	}, []);

	useEffect(() => {
		form.setFieldsValue({
			title: '',
			content: '',
			date: getStringDate(),
			status: 'DO',
		});
	}, [form]);

	const routineSave = () => routineToggle();

	const addRoutineData = async () => {
		const { title, content, date, status } = form.getFieldsValue(['title', 'content', 'date', 'status']);

		await routineController.addRoutine(title, content, date, status);
		getRoutine(date);
	};

	const handleSubmit = () => {
		addRoutineData();
		routineSave();

		if (viewAll) {
			setViewAll(false);
			setOnBorder(!onBorder);
		}
	};

	return (
		<Modal open={onAdd} onCancel={routineToggle} footer={null}>
			{/* <Form form={form}>
				<Form.Item className={styles.titleInputBox}>
					<input
						ref={titleInput}
						name="title"
						value={routineData.title}
						onChange={handleChangeRoutine}
						className={styles.titleInput}
						placeholder="작업이름"
					/>
				</Form.Item>
				<Form.Item className={styles.contentBox}>
					<textarea
						ref={contentInput}
						name="content"
						value={routineData.content}
						onChange={handleChangeRoutine}
						className={styles.contentTextArea}
						placeholder="추가한 이유(150자 이내)"
					/>
				</Form.Item>
				<div className={styles.routineStartBox}>
					<p>언제시작</p>
					<div>
						<input type="text" />
					</div>
				</div>
				<div className={styles.routineStartBox}>
					<p>시간필터</p>
					<div>
						<Btn>아침</Btn>
						<Btn>오후</Btn>
						<Btn>저녁</Btn>
					</div>
				</div>
				<Form.Item className={styles.routineStartBox}>
					<p>루틴 시작일</p>
					<Input type="date" name="date" onChange={handleChangeRoutine} value={routineData.date} />
				</Form.Item>
			</Form>

			<div className={styles.routineSaveBtnBox}>
				<Btn
					onClick={handleSubmit}
					type="primary"
					size="large"
					disabled={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length}
				>
					루틴저장
				</Btn>
			</div> */}

			<Form form={form} name="horizontal_login" layout="inline" onFinish={handleSubmit} className={styles.editorForm}>
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
					<Form.Item name="date">
						<Input type="date" />
					</Form.Item>
				</div>
				<div className={styles.routineStartBox}>
					<p>언제시작</p>
					<div>
						<input type="text" />
					</div>
				</div>
				<div className={styles.routineStartBox}>
					<p>시간필터</p>
					<div>
						<Btn>아침</Btn>
						<Btn>오후</Btn>
						<Btn>저녁</Btn>
					</div>
				</div>
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
