import { useContext } from 'react';
import RoutineItem from './routineItem';
import { RoutineStateContext, IDataType } from '../context/RoutineStateContext';

const RoutineList = () => {
  const routinelist = useContext(RoutineStateContext);

  return (
    <>
      {routinelist.map((it: IDataType) => (
        <RoutineItem key={it.id} {...it} />
      ))}
    </>
  );
};

export default RoutineList;
