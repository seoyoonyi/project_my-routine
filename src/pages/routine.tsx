import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Btn from '../components/btn';
import { IDataType, RoutineStateContext } from '../context/RoutineStateContext';

const Routine = () => {
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
      <h2>모달</h2>
      <Link to="/">
        <Btn text={'X'} />
      </Link>
    </div>
  );
};

export default Routine;
