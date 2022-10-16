import { useEffect, useState } from "react";
import axios from "axios";
import RoutineList from "../components/RoutineList";

import Btn from "../components/Btn";
import RoutineEditor from "../components/RoutineEditor";

export interface IRoutine {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Home = () => {
  const [routines, setRoutines] = useState<IRoutine[]>([]);
  const [onAdd, setOnAdd] = useState(false);

  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };

  const getRoutines = async () => {
    try {
      const { data } = (await axios("http://localhost:8000/routines")).data;

      setRoutines(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <>
      <h1 className="text-xl font-semibold mt-2 text-[#063c76]">마이루틴</h1>
      {onAdd ? (
        <RoutineEditor setRoutines={setRoutines} getRoutines={getRoutines} />
      ) : (
        <Btn onClick={routineToggle} text={"루틴추가하기"} />
      )}

      {routines.map((routine: IRoutine) => {
        return <RoutineList key={routine.id} {...routine} />;
      })}
    </>
  );
};

export default Home;
