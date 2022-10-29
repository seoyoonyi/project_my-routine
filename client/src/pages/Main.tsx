import { useEffect, useState, useCallback, useMemo } from "react";
import RoutineList from "../components/RoutineList";
import Btn from "../components/Btn";
import RoutineEditor from "../components/RoutineEditor";
import { IAppProps } from "../App";
import Header from "../components/Header";
import CurrentWeekTap from "../components/CurrentWeekTap";
import { getCurrentWeekByDash, getStringDate } from "../common/utils";
import styles from "./Main.module.css";
import MainContainer from "../components/MainContainer";

export interface IRoutine {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Main = ({ routineController }: IAppProps) => {
  const today = getStringDate(new Date());
  const currentWeek = useMemo(() => getCurrentWeekByDash(), []);
  const dayIndex = currentWeek.findIndex((it: string) => it === today);
  const [active, setActive] = useState<number>(dayIndex || 0);
  const [moveDistance, setMoveDistance] = useState<number>(0);
  const [routineList, setRoutineList] = useState<IRoutine[]>([]);
  const [onAdd, setOnAdd] = useState<boolean>(false);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [onBorder, setOnBorder] = useState<boolean>(false);

  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };

  const getAllRoutines = useCallback(async () => {
    const response = await routineController.getRoutines();
    setRoutineList(response.data);
  }, [routineController]);

  const getRoutine = useCallback(
    async (date?: string) => {
      if (!date) {
        return;
      }

      const response = await routineController.getRoutinesByDate(date);
      const getRoutineDateIndex = currentWeek.findIndex(
        (it: string) => it === date
      );

      setRoutineList(response.data);
      borderActive(getRoutineDateIndex);
      setActive(getRoutineDateIndex);
    },
    [routineController, currentWeek]
  );

  const borderActive = (index: number) => {
    setMoveDistance(100 * index);
  };

  const handleClickTab = (index: number) => {
    setActive(index);
    borderActive(index);
  };

  const viewAllToggle = () => {
    setViewAll((viewAll) => !viewAll);
    if (!viewAll) {
      getAllRoutines();
      setActive(7);
      setOnBorder(!onBorder);
    } else {
      getRoutine(today);
      borderActive(dayIndex);
      setActive(dayIndex);
      setOnBorder(!onBorder);
    }
  };

  useEffect(() => {
    getRoutine(today);
    borderActive(dayIndex);
  }, [getRoutine, today, dayIndex]);

  return (
    <>
      <Header />
      <MainContainer>
        <div className="flex justify-between pt-10 mx-auto">
          <Btn onClick={routineToggle} size="large" className="rounded-md">
            루틴 추가하기
          </Btn>
          {onAdd && (
            <RoutineEditor
              getRoutine={getRoutine}
              routineToggle={routineToggle}
              onAdd={onAdd}
              routineController={routineController}
              setActive={setActive}
            />
          )}

          <Btn
            className={
              viewAll ? `rounded-md ${styles.viewAllAcitveBtn} ` : "rounded-md"
            }
            onClick={viewAllToggle}
            size="large"
          >
            모든 요일의 루틴보기
          </Btn>
        </div>
        <CurrentWeekTap
          dayIndex={currentWeek}
          getRoutine={getRoutine}
          active={active}
          moveDistance={moveDistance}
          handleClickTab={handleClickTab}
          onBorder={onBorder}
        />

        <div className="pt-10 mx-auto ">
          {routineList
            .map((it: IRoutine) => {
              return (
                <RoutineList
                  key={it.id}
                  {...it}
                  routineController={routineController}
                  getAllRoutines={getAllRoutines} // RoutineModal까지 내려줌
                />
              );
            })
            .reverse()}
        </div>
      </MainContainer>
    </>
  );
};

export default Main;
