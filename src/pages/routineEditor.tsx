import React, { useContext } from 'react';
import { RoutineStateContext } from '../context/RoutineStateContext';
import Btn from '../components/btn';

const RoutineEditor = () => {
  //TODO: 비구조할당으로 바꾸기, Error 처리하기
  const routineSave = useContext(RoutineStateContext);

  return (
    <>
      <h2>에디터</h2>
      <Btn onClick={() => routineSave} text={'루틴저장'} />
    </>
  );
};

export default RoutineEditor;
