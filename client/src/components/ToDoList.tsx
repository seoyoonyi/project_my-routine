import { Fragment, useContext, useMemo } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import { IRoutine } from '../common/type/type';
import RoutineList from './RoutineList';

const ToDoList = () => {
	const { routineContextList, changeActiveStatus } = useContext(RoutineContext);

	const filtereRoutine = useMemo(() => {
		const doList = routineContextList.filter((it: IRoutine) => {
			return it.activeStatus === 'DO';
		});
		const doneList = changeActiveStatus ? [] : routineContextList.filter((it: IRoutine) => it.activeStatus === 'DONE');

		return { doList, doneList };
	}, [routineContextList, changeActiveStatus]);

	return (
		<div>
			{filtereRoutine.doList.map((it: IRoutine) => {
				return (
					<Fragment key={it.id}>
						<RoutineList {...it} />
					</Fragment>
				);
			})}

			{filtereRoutine.doneList?.length > 0 && <p>완료됨</p>}
			{filtereRoutine.doneList.map((it: IRoutine) => {
				return (
					<Fragment key={it.id}>
						<RoutineList {...it} />
					</Fragment>
				);
			})}
		</div>
	);
};

export default ToDoList;
