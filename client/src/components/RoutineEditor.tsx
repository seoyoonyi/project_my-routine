import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import Btn from './Btn';
import RoutineClient from '../service/routine-client';
import { getStringDate } from '../common/utils/utils';
import { Modal, Input } from 'antd';
import { StatusType } from '../common/type/type';

interface IRoutineEditorProps {
	getRoutine: (date: string) => void;
	routineToggle: () => void;
	routineController: RoutineClient;
	onAdd: boolean;
	borderActive: (index: number) => void;
	currentWeek: string[];
	viewAll: boolean;
	setViewAll: Dispatch<SetStateAction<boolean>>;
	onBorder: boolean;
	setOnBorder: Dispatch<SetStateAction<boolean>>;
}

export interface IRoutineDataType {
	title: string;
	content: string;
	date: string;
	status: StatusType;
}

const RoutineEditor = ({
	getRoutine,
	routineToggle,
	routineController,
	onAdd,
	borderActive,
	currentWeek,
	viewAll,
	setViewAll,
	onBorder,
	setOnBorder,
}: IRoutineEditorProps) => {
	const [routineData, setRoutineData] = useState<IRoutineDataType>({
		title: '',
		content: '',
		date: getStringDate(),
		status: 'DO',
	});
	const [onDate, setOnDate] = useState(false);
	const titleInput = useRef<HTMLInputElement>(null);
	const contentInput = useRef<HTMLTextAreaElement>(null);
	const routineDateIndex = currentWeek.findIndex((it: string) => it === routineData.date);

	const dateToggle = () => {
		setOnDate((onDate) => !onDate);
	};

	const routineSave = () => routineToggle();

	const handleChangeRoutine = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRoutineData({
			...routineData,
			[e.target.name]: e.target.value,
		});
	};

	const addRoutineData = async () => {
		await routineController.addRoutine(
			routineData.title,
			routineData.content,
			routineData.date,
			routineData.status,
		);
		getRoutine(routineData.date);
	};

	const handleSubmit = () => {
		addRoutineData();
		setRoutineData({
			title: '',
			content: '',
			date: getStringDate(),
			status: 'DO',
		});
		routineSave();
		if (viewAll === true) {
			setViewAll(false);
			borderActive(routineDateIndex);
			setOnBorder(!onBorder);
		}
	};

	return (
		<Modal open={onAdd} onCancel={routineToggle} footer={null}>
			<input
				ref={titleInput}
				name="title"
				value={routineData.title}
				onChange={handleChangeRoutine}
			/>
			<br />

			<textarea
				ref={contentInput}
				name="content"
				value={routineData.content}
				onChange={handleChangeRoutine}
			/>
			<br />
			<div>
				<Btn onClick={dateToggle}>오늘</Btn>

				{onDate ? (
					<>
						<Input
							type="date"
							name="date"
							onChange={handleChangeRoutine}
							value={routineData.date}
						/>
					</>
				) : null}
				<Btn onClick={handleSubmit}>루틴저장</Btn>
			</div>
		</Modal>
	);
};

export default RoutineEditor;
