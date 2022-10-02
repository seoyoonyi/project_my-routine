import React, { useContext } from 'react';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
import Btn from '../components/btn';
import RoutineEditor from '../components/routineEditor';
import RoutineList from '../components/routineList';

const Home = () => {
  //TODO: Error 처리하기
  const { routineToggle, onAdd } = useContext(RoutineDispatchContext);

  return (
    <>
      <div className="home">
        <h2>마이루틴</h2>
        {onAdd ? (
          <RoutineEditor></RoutineEditor>
        ) : (
          <Btn onClick={routineToggle} text={'루틴추가하기'} />
        )}
        <RoutineList />
      </div>
    </>
  );
};

export default Home;
