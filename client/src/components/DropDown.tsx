import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import { RoutineControllerContext } from '../common/context/APIControllerProvider';
import useRoutines from '../common/hooks/use-routines';
import { getCurrentWeekByParam } from '../common/utils/utils';
import styles from './DropDown.module.css';
interface IDropDownType {
	ActiveStatusTolggle: () => void;
	onWeek: boolean;
	setOnWeek: Dispatch<SetStateAction<boolean>>;
}

const DropDown = ({ ActiveStatusTolggle, onWeek, setOnWeek }: IDropDownType) => {
	const { getRoutine } = useRoutines();
	const routineController = useContext(RoutineControllerContext);
	const { setRoutineContextList, today, changeActiveStatus, setActive, onBorder, setOnBorder } =
		useContext(RoutineContext);
	const DateFromTo = Object.values(getCurrentWeekByParam());

	const getRoutineFromTo = useCallback(
		async (from?: string, to?: string) => {
			const response = await routineController.getRoutinesByDateFromTo(from, to);
			setRoutineContextList(response.data);
			if (!onWeek) {
				setActive(7);
				setOnBorder(!onBorder);
			}
		},
		[onBorder, onWeek, routineController, setActive, setOnBorder, setRoutineContextList],
	);

	const getConditionTime: MenuProps['onClick'] = async (e) => {
		const time = e.key;
		const response = await routineController.getRoutinesByConditionTime(time);
		setRoutineContextList(response.data);
	};

	const items: MenuProps['items'] = [
		{
			label: '오늘',
			key: '오늘',
			onClick: () => {
				getRoutine(today);
			},
		},
		{
			label: '이번 주',
			key: '이번 주',
			onClick: () => {
				getRoutineFromTo(DateFromTo[0], DateFromTo[1]);
				setOnWeek(true);
			},
		},

		{
			key: '모든시간',
			label: '모든시간',
			className: styles.allTimeBtn,
			onClick: (e) => {
				getConditionTime(e);
			},
			children: [
				{
					key: '아침',
					label: '아침',
				},
				{
					key: '오후',
					label: '오후',
				},
				{
					key: '저녁',
					label: '저녁',
				},
			],
		},

		{
			label: !changeActiveStatus ? '완료된 작업 숨기기' : '완료된 작업 표시',
			key: !changeActiveStatus ? '완료된 작업 숨기기' : '완료된 작업 표시',
			onClick: () => {
				ActiveStatusTolggle();
			},
		},
	];

	return (
		<Dropdown
			menu={{ items }}
			trigger={['click']}
			placement="bottomRight"
			className="flex items-center justify-center w-8 h-full rounded-md hover:bg-gray-100"
		>
			{/* eslint-disable jsx-a11y/anchor-is-valid */}
			<a onClick={(e) => e.preventDefault()}>
				<Space>
					<ChevronDown size={20} color="#B5B5B5" />
				</Space>
			</a>
		</Dropdown>
	);
};

export default DropDown;
