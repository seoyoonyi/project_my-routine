import React, { Dispatch, SetStateAction, useContext, useRef, useState } from 'react';
import Btn from './Btn';
import RoutineClient from '../service/routine-client';
import { getStringDate } from '../common/utils/utils';
import { Modal, Input } from 'antd';
import { StatusType } from '../common/type/type';
import RoutineControllerContext from '../common/context/RoutineControllerContext';

interface IRoutineEditorProps {
	viewController: {
		viewAll: boolean;
		setViewAll: Dispatch<SetStateAction<boolean>>;
	};
	borderController: {
		borderActive: (index: number) => void;
		onBorder: boolean;
		setOnBorder: Dispatch<SetStateAction<boolean>>;
	};
	routinesAndEtcController: {
		getRoutine: (date: string) => void;
		routineToggle: () => void;
		onAdd: boolean;
		currentWeek: string[];
	};
}

export interface IRoutineDataType {
	title: string;
	content: string;
	date: string;
	status: StatusType;
}

const RoutineEditor = ({
	viewController,
	borderController,
	routinesAndEtcController,
}: IRoutineEditorProps) => {
	const { viewAll, setViewAll } = viewController;
	const { onBorder, setOnBorder, borderActive } = borderController;
	const { getRoutine, routineToggle, currentWeek, onAdd } = routinesAndEtcController;

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
	const routineController = useContext(RoutineControllerContext);

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
