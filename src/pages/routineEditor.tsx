import React from 'react';
import Btn from '../components/btn';
interface IRoutineEditorProps {
  routineSave: () => void;
}

const RoutineEditor = ({ routineSave }: IRoutineEditorProps) => {
  return (
    <>
      <h2>에디터</h2>
      <Btn onClick={routineSave} text={'루틴저장'} />
    </>
  );
};

export default RoutineEditor;
