import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Btn from '../components/btn';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
import { IDataType, RoutineStateContext } from '../context/routineStateContext';

const Routine = () => {
  const { id } = useParams();
  const routineList = useContext(RoutineStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState<IDataType | undefined>();
  const { closeRoutine } = useContext(RoutineDispatchContext);

  useEffect(() => {
    if (routineList.length >= 1) {
      const targetRoutine = routineList.find(
        (it) => Number(it.id) === Number(id),
      );

      if (targetRoutine) {
        setData(targetRoutine);
      } else {
        alert('없는 루틴입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, routineList]);

  if (!data) {
    return <div>로딩중입니다...</div>;
  } else {
    return (
      <div>
        <h3>{data.title}</h3>
        <p>{data.content}</p>
        <p>{data.date}</p>
        <Btn onClick={closeRoutine} text={'X'} />
      </div>
    );
  }
};

export default Routine;
