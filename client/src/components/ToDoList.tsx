import { Fragment, useContext, useMemo } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import useRoutines from '../common/hooks/use-routines';
import { IRoutine } from '../common/type/type';
import RoutineList from './RoutineList';

interface IToDoListType {
	changeActiveStatus: boolean;
}

const ToDoList = ({ changeActiveStatus }: IToDoListType) => {
	const { getRoutine } = useRoutines('');
	const { routineContextList } = useContext(RoutineContext);

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
						<RoutineList {...it} getRoutine={getRoutine} />
					</Fragment>
				);
			})}

			{filtereRoutine.doneList?.length > 0 && <p>완료됨</p>}
			{filtereRoutine.doneList.map((it: IRoutine) => {
				return (
					<Fragment key={it.id}>
						<RoutineList {...it} getRoutine={getRoutine} />
					</Fragment>
				);
			})}
		</div>
	);
};

export default ToDoList;
