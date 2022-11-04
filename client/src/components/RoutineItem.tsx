import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRoutineListProps } from './RoutineList';
import styles from './RoutineItem.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
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
	getAllRoutines,
	showModal,
}: IRoutineItemProps) => {
	const [checked, setChecked] = useState(false);
	const changeStatus = checked ? 'DONE' : 'DO';

	const EditRoutineStatus = async () => {
		await routineController.editRoutine(id, title, content, date, (status = changeStatus));
		console.log(status);
	};

	const toggleChecked = () => {
		setChecked((checked) => !checked);
		EditRoutineStatus();
	};

	return (
		<>
			<div className={styles.routineItem}>
				<div className={styles.routineContent}>
					<span className={styles.routineStatus} onClick={toggleChecked}>
						{checked ? (
							<span className={styles.checkedIconBg}>
								<FontAwesomeIcon icon={faCheck} color="grey" className={styles.checkedIcoon} />
							</span>
						) : null}
					</span>
					<div
						className={styles.routineTxt}
						onClick={() => {
							showModal();
						}}
					>
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
