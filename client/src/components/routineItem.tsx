import { CheckCircleOutlined } from '@ant-design/icons';
import { IRoutineListProps } from './RoutineList';

interface IRoutineItemProps extends IRoutineListProps {
	showModal: () => void;
}

const RoutineItem = ({ title, content, date, showModal }: IRoutineItemProps) => {
	return (
		<>
			<div
				className="flex gap-2 mt-4 routineItem"
				onClick={() => {
					showModal();
				}}
			>
				<CheckCircleOutlined />
				<div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
					<h3>{title}</h3>
					<p>{content}</p>
				</div>
				<p className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ">
					{date}
				</p>
			</div>
		</>
	);
};

export default RoutineItem;
