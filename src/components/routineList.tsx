import { useContext, useState } from 'react';
import RoutineItem from './routineItem';
import { RoutineStateContext, IDataType } from '../context/routineStateContext';

const RoutineList = () => {
  const routinelist = useContext(RoutineStateContext);

  return (
    <>
      {routinelist.map((it: IDataType, idx) => (
        <RoutineItem key={it.id} {...it} />
      ))}
    </>
  );
};

export default RoutineList;
