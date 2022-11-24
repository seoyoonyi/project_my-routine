import { Fragment, useContext, useMemo } from 'react';
import { RoutineContext } from '../common/context/RoutineContext';
import { IRoutine } from '../common/type/type';
import EmptyRoutine from './EmptyRoutine';
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
		<>
			{filtereRoutine.doneList?.length <= 0 && filtereRoutine.doList?.length <= 0 && <EmptyRoutine />}
			{filtereRoutine.doList.map((it: IRoutine) => {
				return (
					<Fragment key={it.id}>
						<RoutineList {...it} />
					</Fragment>
				);
			})}

			{filtereRoutine.doneList?.length > 0 && <p className="pb-1 pl-1 mt-10 text-sm font-medium text-gray-500 border-b-2 border-gray-100">완료됨</p>}
			{filtereRoutine.doneList.map((it: IRoutine) => {
				return (
					<Fragment key={it.id}>
						<RoutineList {...it} />
					</Fragment>
				);
			})}
		</>
	);
};

export default ToDoList;
