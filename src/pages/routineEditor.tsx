import React, { useContext, useRef, useState } from 'react';
import { RoutineDispatchContext } from '../context/routineDispatchContext';
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
  const { routineSave, onCreate } = useContext(RoutineDispatchContext);

  const dateToggle = () => {
    setOnDate((onDate) => !onDate);
  };

  const handleChangeRoutine = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRoutine({
      ...routine,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onCreate(routine.title, routine.content);
    alert('저장성공');

    routineSave();
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
        onChange={handleChangeRoutine}
      ></textarea>
      <br />
      <div>
        <Btn onClick={dateToggle} text={'날짜'} />
        {onDate ? <input type="date" /> : null}
        <Btn onClick={handleSubmit} text={'루틴저장'} />
      </div>
    </>
  );
};

export default RoutineEditor;
