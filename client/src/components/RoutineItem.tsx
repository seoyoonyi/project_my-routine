import { Dispatch, SetStateAction, useContext } from 'react';
import { StatusType } from '../common/type/type';
import { IRoutineListProps } from './RoutineList';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RoutineItem.module.css';
import RoutineControllerContext from '../common/context/RoutineControllerContext';

interface IRoutineItemProps extends IRoutineListProps {
	showModal: () => void;
	statusController: {
		status: StatusType;
		setStatus: Dispatch<SetStateAction<StatusType>>;
	};
}

const RoutineItem = ({ id, title, content, date, statusController, showModal }: IRoutineItemProps) => {
	const { status, setStatus } = statusController;
	const routineController = useContext(RoutineControllerContext);
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
					<div className={styles.routineStatus}>
						<span
							className={status === 'DONE' ? `${styles.routineStatusCircle} ${styles.active}` : styles.routineStatusCircle}
							onClick={EditRoutineStatus}
						>
							{status === 'DONE' && (
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
							<p className={styles.dateTxt}>시간필터</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoutineItem;
