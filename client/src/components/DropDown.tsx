import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ChangeEvent, useCallback, useContext } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import RoutineControllerContext from '../common/context/RoutineControllerContext';
import { getCurrentWeekByParam } from '../common/utils/utils';
interface IDropDownType {
	getRoutineActive: (activeStatus: string) => Promise<void>;
	getRoutine: (today: string) => Promise<void>;
	today: string;
}

const DropDown = ({ getRoutine, today, getRoutineActive }: IDropDownType) => {
	const [changeActiveStatus, setChangeActiveStatus] = useState<boolean>(false);
	const routineController = useContext(RoutineControllerContext);
	const { setRoutineContextList } = useContext(RoutineContext);
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
			label: '완료된 페이지 표시',
			key: '4',
			onClick: () => {
				setChangeActiveStatus((prev) => !prev);
				getRoutineActive(changeActiveStatus ? 'DO' : 'DONE');
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
			<a onClick={(e) => e.preventDefault()}>
				<Space>
					<ChevronDown size={20} color="#B5B5B5" />
				</Space>
			</a>
		</Dropdown>
	);
};

export default DropDown;
