import React, { useRef, useState } from 'react';
import Btn from './Btn';
import { IRoutineListProps } from './RoutineList';
import RoutineClient from '../service/routine-client';

export const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
interface IRoutineEditorProps {
  getRoutinesData: () => void;
  routineToggle: () => void;
  routine: RoutineClient;
}
const RoutineEditor = ({ getRoutinesData, routineToggle, routine }: IRoutineEditorProps) => {
  const [routineData, setRoutineData] = useState<IRoutineListProps>({
    title: '',
    content: '',
    date: getStringDate(new Date()),
  });
  const [onDate, setOnDate] = useState(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);

  const dateToggle = () => {
    setOnDate((onDate) => !onDate);
  };

  const routineSave = () => routineToggle();

  const handleChangeRoutine = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRoutineData({
      ...routineData,
      [e.target.name]: e.target.value,
    });
  };

  const addRoutineData = async () => {
    await routine.addRoutine(routineData.title, routineData.content, routineData.date);
    getRoutinesData();
  };

  const handleSubmit = () => {
    addRoutineData();
    setRoutineData({
      title: '',
      content: '',
      date: getStringDate(new Date()),
    });
    routineSave();
  };

  return (
    <>
      <input ref={titleInput} name="title" value={routineData.title} onChange={handleChangeRoutine} />
      <br />

      <textarea ref={contentInput} name="content" value={routineData.content} onChange={handleChangeRoutine}></textarea>
      <br />
      <div>
        <Btn onClick={dateToggle}>오늘</Btn>
        {onDate ? <input type="date" name="date" onChange={handleChangeRoutine} value={routineData.date} /> : null}
        <Btn onClick={handleSubmit}>루틴저장</Btn>
      </div>
    </>
  );
};

export default RoutineEditor;
