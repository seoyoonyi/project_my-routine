import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  RoutineStateContext,
  IRoutineState,
} from './context/routineStateContext';
import { RoutineDispatchContext } from './context/routineDispatchContext';
import Home from './pages/home';
import RoutineEditor from './pages/routineEditor';
import Routine from './pages/routine';

const App = () => {
  const [data, setData] = useState<IRoutineState>([]);
  const [onAdd, setOnAdd] = useState(false);
  const dataId = useRef(0);
  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };
  const routineSave = () => routineToggle();

  const onCreate = (title: string, content: string, date: string) => {
    const newItem = {
      id: dataId.current++,
      title,
      content,
      date,
    };
    setData((data) => [newItem, ...data]);
    console.log(newItem);
  };

  return (
    <RoutineStateContext.Provider value={data}>
      <RoutineDispatchContext.Provider
        value={{ routineSave, routineToggle, onAdd, onCreate }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<RoutineEditor />} />
              <Route path="/routine/:id" element={<Routine />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RoutineDispatchContext.Provider>
    </RoutineStateContext.Provider>
  );
};

export default App;
