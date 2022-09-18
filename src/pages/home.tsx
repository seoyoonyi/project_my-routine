import React, { useContext } from 'react';
import { RoutineStateContext } from '../context/RoutineStateContext';
import Btn from '../components/btn';
import RoutineEditor from './routineEditor';

const Home = () => {
  //TODO: 비구조할당으로 바꾸기, Error 처리하기, 버튼 고치기
  const routineToggle = useContext(RoutineStateContext);
  const onAdd = useContext(RoutineStateContext);

  return (
    <div>
      <h2>마이루틴</h2>
      {onAdd ? (
        <Btn onClick={() => routineToggle} text={'루틴추가하기'} />
      ) : (
        <RoutineEditor></RoutineEditor>
      )}
    </div>
  );
};

export default Home;
