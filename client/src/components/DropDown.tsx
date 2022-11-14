import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
interface IDropDownType {
	getRoutineActive: (e: any) => Promise<void>;
}

const DropDown = ({ getRoutineActive }: IDropDownType) => {
	const items: MenuProps['items'] = [
		{
			label: 'DONE',
			key: '0',
			onClick: (e) => {
				getRoutineActive(e);
			},
		},
		{
			label: 'DO',
			key: '1',
			onClick: (e) => {
				getRoutineActive(e);
			},
		},
		{
			type: 'divider',
		},
		{
			label: '3rd menu item',
			key: '3',
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={['click']}>
			<a onClick={(e) => e.preventDefault()}>
				<Space>
					<DownOutlined />
				</Space>
			</a>
		</Dropdown>
	);
};

export default DropDown;
