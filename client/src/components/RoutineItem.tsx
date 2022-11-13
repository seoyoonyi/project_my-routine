import { Dispatch, SetStateAction, useContext } from 'react';
import { ActiveStatus } from '../common/type/type';
import { IRoutineListProps } from './RoutineList';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RoutineItem.module.css';
import RoutineControllerContext from '../common/context/RoutineControllerContext';

interface IRoutineItemProps extends IRoutineListProps {
	showModal: () => void;
	activeStatusController: {
		activeStatus: ActiveStatus;
		setActiveStatus: Dispatch<SetStateAction<ActiveStatus>>;
	};
}

const RoutineItem = ({ id, title, content, date, activeStatusController, timeStatus, showModal }: IRoutineItemProps) => {
	const { activeStatus, setActiveStatus } = activeStatusController;
	const routineController = useContext(RoutineControllerContext);
	const toggleActiveStatus = (routineStatus: ActiveStatus) => {
		setActiveStatus(routineStatus);
	};

	const EditRoutineStatus = async () => {
		const routineActiveStatus = activeStatus === 'DO' ? 'DONE' : 'DO';
		toggleActiveStatus(routineActiveStatus);

		await routineController.editRoutine(id, title, content, date, routineActiveStatus, timeStatus);
	};

	return (
		<>
			<div className={styles.routineItem}>
				<div className={styles.routineContent}>
					<div className={styles.routineActiveStatus}>
						<span
							className={activeStatus === 'DONE' ? `${styles.routineActiveStatusCircle} ${styles.active}` : styles.routineActiveStatusCircle}
							onClick={EditRoutineStatus}
						>
							{activeStatus === 'DONE' && (
								<span className={styles.checkedIconBg}>
									<FontAwesomeIcon icon={faCheck} color="#37e2d5" className={styles.checkedIcoon} />
								</span>
							)}
						</span>
					</div>
					<div className="flex w-full" onClick={() => showModal()}>
						<div className="w-2/12">
							<p className={styles.timeTxt}>언제할 예정</p>
						</div>
						<div className={styles.routineTxtBox}>
							<h3 className={styles.titleTxt}>(도전루틴뱃지){title}</h3>
							<p className={styles.contentTxt}>{content}</p>
						</div>
						<div className="flex justify-end w-2/12">
							{/* 날짜 주석처리 */}
							{/* <p className={styles.dateTxt}>{date}</p> */}
							<p className={styles.dateTxt}>{timeStatus}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoutineItem;
