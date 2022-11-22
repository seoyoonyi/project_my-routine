import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useCallback, useContext } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import RoutineControllerContext from '../common/context/RoutineControllerContext';
import useRoutines from '../common/hooks/use-routines';
import { getCurrentWeekByParam } from '../common/utils/utils';
interface IDropDownType {
	ActiveStatusTolggle: () => void;
}

const DropDown = ({ ActiveStatusTolggle }: IDropDownType) => {
	const { getRoutine } = useRoutines();
	const routineController = useContext(RoutineControllerContext);
	const { setRoutineContextList, today, changeActiveStatus } = useContext(RoutineContext);
	const DateFromTo = Object.values(getCurrentWeekByParam());

	const getRoutineFromTo = useCallback(
		async (from?: string, to?: string) => {
			const response = await routineController.getRoutinesByDateFromTo(from, to);
			setRoutineContextList(response.data);
		},
		[routineController, setRoutineContextList],
	);

	const items: MenuProps['items'] = [
		{
			label: '오늘',
			key: '0',
			onClick: () => {
				getRoutine(today);
			},
		},
		{
			label: '이번 주',
			key: '1',
			onClick: () => {
				getRoutineFromTo(DateFromTo[0], DateFromTo[1]);
			},
		},

		{
			key: '3',
			label: '모든시간',
			children: [
				{
					key: '3-1',
					label: '아침',
				},
				{
					key: '3-2',
					label: '오후',
				},
				{
					key: '3-3',
					label: '저녁',
				},
			],
		},

		{
			label: !changeActiveStatus ? '완료된 작업 숨기기' : '완료된 작업 표시',
			key: '4',
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
