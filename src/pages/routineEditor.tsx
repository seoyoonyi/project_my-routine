import React, { useContext, useRef, useState } from 'react';
import { RoutineStateContext } from '../context/RoutineStateContext';
import Btn from '../components/btn';

const RoutineEditor = () => {
  const [routine, setRoutine] = useState({
    title: '',
    content: '',
  });
  const [onDate, setOnDate] = useState(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);
  //TODO: Error 처리하기
  const { routineSave } = useContext(RoutineStateContext);

  const handleChangeRoutine = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoutine({
      ...routine,
      [e.target.name]: e.target.value,
    });
  };
  const dateToggle = () => {
    setOnDate((onDate) => !onDate);
  };

  return (
    <>
      <input
        ref={titleInput}
        name="title"
        value={routine.title}
        onChange={handleChangeRoutine}
      />
      <br />

      <textarea
        ref={contentInput}
        name="content"
        value={routine.content}
      ></textarea>
      <br />
      <div>
        <Btn onClick={dateToggle} text={'날짜'} />
        {onDate ? <input type="date" /> : null}
        <Btn onClick={routineSave} text={'루틴저장'} />
      </div>
    </>
  );
};

export default RoutineEditor;
