import React, { useRef, useState } from 'react';
import Btn from './Btn';
import RoutineClient from '../service/routine-client';
import { getStringDate } from '../common/utils';
import { CalendarOutlined } from '@ant-design/icons';
import Input from 'antd/lib/input/Input';

interface IRoutineEditorProps {
	getRoutinesData: () => void;
	routineToggle: () => void;
	routineController: RoutineClient;
}

export interface IRoutineDataType {
	title: string;
	content: string;
	date: string;
}

const RoutineEditor = ({
	getRoutinesData,
	routineToggle,
	routineController,
}: IRoutineEditorProps) => {
	const [routineData, setRoutineData] = useState<IRoutineDataType>({
		title: '',
		content: '',
		date: getStringDate(new Date()),
	});
	const [onDate, setOnDate] = useState(false);
	const titleInput = useRef<HTMLInputElement>(null);
	const contentInput = useRef<HTMLTextAreaElement>(null);

	const dateToggle = () => {
		setOnDate(onDate => !onDate);
	};

	const routineSave = () => routineToggle();

	const handleChangeRoutine = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRoutineData({
			...routineData,
			[e.target.name]: e.target.value,
		});
	};

	const addRoutineData = async () => {
		await routineController.addRoutine(routineData.title, routineData.content, routineData.date);
		getRoutinesData();
	};

	const handleSubmit = () => {
		addRoutineData();
		setRoutineData({
			title: '',
			content: '',
			date: getStringDate(new Date()),
		});
		routineSave();
	};

	return (
		<>
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
		</>
	);
};

export default RoutineEditor;
