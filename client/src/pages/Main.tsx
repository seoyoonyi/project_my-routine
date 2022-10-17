import { useEffect, useState, useCallback } from 'react';
import RoutineList from '../components/RoutineList';
import Btn from '../components/Btn';
import RoutineEditor from '../components/RoutineEditor';
import { IAppProps } from '../App';

export interface IRoutine {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Main = ({ routine }: IAppProps) => {
  const [routines, setRoutines] = useState<IRoutine[]>([]);
  const [onAdd, setOnAdd] = useState(false);

  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };

  const getRoutinesData = useCallback(async () => {
    const response = await routine.getRoutines();
    setRoutines(response.data);
  }, [routine]);

  useEffect(() => {
    getRoutinesData();
  }, [getRoutinesData]);

  return (
    <>
      <h1 className="text-xl font-semibold mt-2 text-[#063c76]">마이루틴</h1>
      {onAdd ? <RoutineEditor getRoutinesData={getRoutinesData} routineToggle={routineToggle} routine={routine} /> : <Btn onClick={routineToggle}>루틴추가하기</Btn>}

      {routines.map((routine: IRoutine) => {
        return <RoutineList key={routine.id} {...routine} />;
      })}
    </>
  );
};

export default Main;