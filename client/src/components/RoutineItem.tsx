import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRoutineListProps } from './RoutineList';
import styles from './RoutineItem.module.css';
import { useState } from 'react';
import { StatusType } from '../common/type/type';

interface IRoutineItemProps extends IRoutineListProps {
	showModal: () => void;
}

const RoutineItem = ({
	id,
	title,
	content,
	date,
	status,
	routineController,
	showModal,
}: IRoutineItemProps) => {
	const [isDone, setIsDone] = useState(false);
	const [changeStatus, setChangeStatus] = useState<StatusType>(status);

	const EditRoutineStatus = async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setChangeStatus((changeStatus) => (changeStatus = isDone ? 'DONE' : 'DO'));
		await routineController.editRoutine(id, title, content, date, changeStatus);
	};

	const toggleDone = () => {
		setIsDone((checked) => !checked);
		EditRoutineStatus();
		console.log('status :: ' + status);
		console.log('changeStatus :: ' + changeStatus);
	};

	return (
		<>
			<div className={styles.routineItem}>
				<div className={styles.routineContent}>
					<span className={styles.routineStatus} onClick={toggleDone}>
						{isDone && (status = 'DONE') && (
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
