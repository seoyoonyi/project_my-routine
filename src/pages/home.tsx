import React from 'react';
import Btn from '../components/btn';
import RoutineEditor from './routineEditor';
interface IHomeProps {
  routineAdd: () => void;
  onAdd: boolean;
}

const Home = ({ routineAdd, onAdd }: IHomeProps) => {
  const routineSave = () => routineAdd();
  return (
    <div>
      <h2>마이루틴</h2>
      {onAdd ? (
        <RoutineEditor routineSave={routineSave}></RoutineEditor>
      ) : (
        <Btn onClick={routineAdd} text={'루틴추가하기'} />
      )}
    </div>
  );
};

export default Home;
