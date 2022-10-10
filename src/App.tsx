import React, { useState, useRef, useReducer, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { RoutineStateContext } from "./context/routineStateContext";
import { RoutineDispatchContext } from "./context/routineDispatchContext";
import Home from "./pages/home";
import RoutineEditor from "./components/routineEditor";
import { useCallback } from "react";

interface ReducerState {
  id: number;
  title: string;
  content: string;
  date: string;
}

const initialState: ReducerState[] = [];

export const SET_CREATE = "SET_CREATE" as const;
export const SET_REMOVE = "SET_REMOVE" as const;

interface ICreateAction {
  type: typeof SET_CREATE;
  data: {
    id: number;
    title: string;
    content: string;
    date: string;
  };
}

interface IRemoveAction {
  type: typeof SET_REMOVE;
  targetId: number;
}

export type ReducerAction = ICreateAction | IRemoveAction;

const setCreate = (
  id: number,
  title: string,
  content: string,
  date: string
): ICreateAction => {
  return { type: SET_CREATE, data: { id, title, content, date } };
};
const setRemove = (targetId: number): IRemoveAction => {
  return { type: SET_REMOVE, targetId };
};

const reducer = (
  state: ReducerState[] = initialState,
  action: ReducerAction
) => {
  switch (action.type) {
    case SET_CREATE: {
      const created_date = new Date().getTime();
      const newItem = { ...action.data, created_date };
      return [newItem, ...state];
    }
    case SET_REMOVE: {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
};

const App = () => {
  const [onAdd, setOnAdd] = useState(false);
  const [data, dispatch] = useReducer<
    React.Reducer<ReducerState[], ReducerAction>
  >(reducer, initialState);
  const dataId = useRef(0);

  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };
  const routineSave = () => routineToggle();

  const onCreate = useCallback(
    (title: string, content: string, date: string) => {
      dispatch(setCreate(dataId.current, title, content, date));
      dataId.current += 1;
    },
    []
  );

  const onRemove = useCallback((targetId: number) => {
    dispatch(setRemove(targetId));
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove };
  }, [onCreate, onRemove]);

  return (
    <RoutineStateContext.Provider value={data}>
      <RoutineDispatchContext.Provider
        value={{ memoizedDispatches, routineSave, routineToggle, onAdd }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<RoutineEditor />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RoutineDispatchContext.Provider>
    </RoutineStateContext.Provider>
  );
};

export default App;
