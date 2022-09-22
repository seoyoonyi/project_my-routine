import React, { useContext } from 'react';
import { RoutineStateContext } from '../context/RoutineStateContext';
import Btn from '../components/btn';
import RoutineEditor from './routineEditor';

const Home = () => {
  //TODO: Error 처리하기
  const { routineToggle, onAdd } = useContext(RoutineStateContext);

  return (
    <>
      <h2>마이루틴</h2>
      {onAdd ? (
        <RoutineEditor></RoutineEditor>
      ) : (
        <Btn onClick={routineToggle} text={'루틴추가하기'} />
      )}
    </>
  );
};

export default Home;
