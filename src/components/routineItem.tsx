import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
import { IDataType } from '../context/routineStateContext';
import Routine from '../pages/routine';

const RoutineItem = ({ id, title, content, date }: IDataType) => {
  const strDate = new Date(date).toLocaleDateString();
  const { onRoutine, openRoutine } = useContext(RoutineDispatchContext);

  return (
    <>
      <div className="routineItem" onClick={openRoutine}>
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{strDate}</p>
      </div>
      {onRoutine === true ? <Routine /> : null}
    </>
  );
};

export default RoutineItem;
