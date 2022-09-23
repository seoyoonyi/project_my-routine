import React, { useContext } from 'react';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
import Btn from '../components/btn';
import RoutineEditor from './routineEditor';
import RoutineList from './routineList';

const Home = () => {
  //TODO: Error 처리하기
  const { routineToggle, onAdd } = useContext(RoutineDispatchContext);

  return (
    <>
      <h2>마이루틴</h2>
      {onAdd ? (
        <RoutineEditor></RoutineEditor>
      ) : (
        <>
          <Btn onClick={routineToggle} text={'루틴추가하기'} />
        </>
      )}
      <RoutineList />
    </>
  );
};

export default Home;
