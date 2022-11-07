import { Dispatch, SetStateAction } from 'react';
import { StatusType } from '../common/type/type';
import { IRoutineListProps } from './RoutineList';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RoutineItem.module.css';

interface IRoutineItemProps extends IRoutineListProps {
	showModal: () => void;
	status: StatusType;
	setStatus: Dispatch<SetStateAction<StatusType>>;
}

const RoutineItem = ({
	id,
	title,
	content,
	date,
	routineController,
	status,
	setStatus,
	showModal,
}: IRoutineItemProps) => {
	const toggleStatus = (routineStatus: StatusType) => {
		setStatus(routineStatus);
	};

	const EditRoutineStatus = async () => {
		const routineStatus = status === 'DO' ? 'DONE' : 'DO';
		toggleStatus(routineStatus);

		await routineController.editRoutine(id, title, content, date, routineStatus);
	};

	return (
		<>
			<div className={styles.routineItem}>
				<div className={styles.routineContent}>
					<span className={styles.routineStatus} onClick={EditRoutineStatus}>
						{status === 'DONE' && (
							<span className={styles.checkedIconBg}>
								<FontAwesomeIcon icon={faCheck} color="grey" className={styles.checkedIcoon} />
							</span>
						)}
					</span>
					<div
						className={styles.routineTxt}
						onClick={() => {
							showModal();
						}}
					>
						<p>{status}</p>
						<h3>{title}</h3>
						<p>{content}</p>
					</div>
				</div>
				<p className={styles.routineDate}>{date}</p>
			</div>
		</>
	);
};

export default RoutineItem;
