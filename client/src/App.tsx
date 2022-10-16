import React, { useState, useRef, useReducer, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { RoutineStateContext } from "./context/routineStateContext";
import { RoutineDispatchContext } from "./context/routineDispatchContext";
import Home from "./pages/home";
import RoutineEditor from "./components/routineEditor";
import { useCallback } from "react";
import axios from "axios";

interface ReducerState {
  id: number;
  title: string;
  content: string;
  date: string;
}

const initialState: ReducerState[] = [];

export const SET_READ = "SET_READ" as const;
export const SET_CREATE = "SET_CREATE" as const;
export const SET_REMOVE = "SET_REMOVE" as const;
export const SET_EDIT = "SET_EDIT" as const;

interface IReadAction {
  type: typeof SET_READ;
  data: any;
}

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

interface IEditAction {
  type: typeof SET_EDIT;
  targetId: number;
  data: {
    title: string;
    content: string;
    date: string;
  };
}

export type ReducerAction =
  | IReadAction
  | ICreateAction
  | IRemoveAction
  | IEditAction;

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

const setEdit = (
  targetId: number,
  title: string,
  content: string,
  date: string
): IEditAction => {
  return { type: SET_EDIT, targetId, data: { title, content, date } };
};

const reducer = (
  state: ReducerState[] = initialState,
  action: ReducerAction
) => {
  switch (action.type) {
    case SET_READ: {
      return action.data;
    }
    case SET_CREATE: {
      const created_date = new Date().getTime();
      const newItem = { ...action.data, created_date };
      return [newItem, ...state];
    }
    case SET_REMOVE: {
      return state.filter((it) => it.id !== action.targetId);
    }
    case SET_EDIT: {
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              title: action.data.title,
              content: action.data.content,
              date: action.data.date,
            }
          : it
      );
    }
    default:
      return state;
  }
};

interface IRoutine {
  id: number;
  title: string;
  content: string;
  date: string;
}

const App = () => {
  const [onAdd, setOnAdd] = useState(false);
  const [data, dispatch] = useReducer<
    React.Reducer<ReducerState[], ReducerAction>
  >(reducer, initialState);
  const [routines, setRoutines] = useState<IRoutine[]>([]);
  const dataId = useRef(0);

  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };
  const routineSave = () => routineToggle();

  const fetchRoutine = async () => {
    try {
      const { data } = (await axios("http://localhost:8000/routines")).data;
      dispatch({ type: SET_READ, data: data });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRoutine();
  }, []);

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

  const onEdit = useCallback(
    (targetId: number, title: string, content: string, date: string) => {
      dispatch(setEdit(targetId, title, content, date));
    },
    []
  );

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, [onCreate, onRemove, onEdit]);

  return (
    <RoutineStateContext.Provider value={data}>
      <RoutineDispatchContext.Provider
        value={{ memoizedDispatches, routineSave, routineToggle, onAdd }}
      >
        <BrowserRouter>
          <div className="App flex justify-center items-center min-h-screen bg-[#cbd7e3]">
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
