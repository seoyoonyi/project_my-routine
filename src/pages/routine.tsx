import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Btn from '../components/btn';
import { IDataType, RoutineStateContext } from '../context/RoutineStateContext';
interface IRoutineProps {
  closeRoutine: () => void;
}

const Routine = ({ closeRoutine }: IRoutineProps) => {
  let { id } = useParams();
  const routineList = useContext(RoutineStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState<IDataType | undefined>();

  useEffect(() => {
    if (routineList.length >= 1) {
      const targetRoutine = routineList.find(
        (it) => Number(it.id) === Number(id),
      );

      if (targetRoutine) {
        setData(targetRoutine);
      } else {
        navigate('/', { replace: true });
        alert('없는 루틴입니다.');
      }
    }
  }, [id, routineList]);

  if (!data) {
    return <div>로딩중입니다...</div>;
  }
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <p>{data.date}</p>
      <Btn onClick={closeRoutine} text={'X'} />
    </div>
  );
};

export default Routine;
