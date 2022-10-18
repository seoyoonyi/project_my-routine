import { useEffect, useState, useCallback } from 'react';
import RoutineList from '../components/RoutineList';
import Btn from '../components/Btn';
import RoutineEditor from '../components/RoutineEditor';
import { IAppProps } from '../App';
import Header from '../components/Header';
import { getCurrentWeekByLocal, getCurrentWeekByDate } from '../common/utils';

export interface IRoutine {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Main = ({ routineController }: IAppProps) => {
  const [routineList, setRoutineList] = useState<IRoutine[]>([]);
  const [onAdd, setOnAdd] = useState(false);

  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };

  const getRoutinesData = useCallback(async () => {
    const response = await routineController.getRoutines();
    setRoutineList(response.data);
  }, [routineController]);

  useEffect(() => {
    getRoutinesData();
  }, [getRoutinesData]);

  const getRoutinesByDateData = useCallback(
    async (date?: string) => {
      // let response;
      // response = date ? await routineController.getRoutinesByDate(date) : getRoutinesData();
      const response = await routineController.getRoutinesByDate(date);
      console.log(response);
    },
    [routineController],
  );

  useEffect(() => {
    getRoutinesByDateData();
  }, [getRoutinesByDateData]);

  return (
    <>
      <Header />
      <ul>
        {getCurrentWeekByLocal().map((it: string, index) => {
          return (
            <li data-day={getCurrentWeekByDate()[index]} key={it}>
              {it}
            </li>
          );
        })}
      </ul>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-40 pb-12 md:pt-40 md:pb-20">
          {onAdd ? <RoutineEditor getRoutinesData={getRoutinesData} routineToggle={routineToggle} routineController={routineController} /> : <Btn onClick={routineToggle}>루틴추가하기</Btn>}

          {routineList
            .map((it: IRoutine) => {
              return <RoutineList key={it.id} {...it} routineController={routineController} getRoutinesData={getRoutinesData} />;
            })
            .reverse()}
        </div>
      </div>
    </>
  );
};

export default Main;
