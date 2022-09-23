import { useContext } from 'react';
import RoutineItem from '../components/routineItem';
import { RoutineStateContext, IDataType } from '../context/routineStateContext';

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
