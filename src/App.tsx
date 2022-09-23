import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  RoutineStateContext,
  IRoutineState,
} from './context/routineStateContext';
import { RoutineDispatchContext } from './context/routineDispatchContext';
import Home from './pages/home';
import RoutineEditor from './pages/routineEditor';

const App = () => {
  const [data, setData] = useState<IRoutineState>([]);
  const [onAdd, setOnAdd] = useState(false);
  const dataId = useRef(0);
  const routineToggle = () => {
    setOnAdd((onAdd) => !onAdd);
  };
  const routineSave = () => routineToggle();

  const onCreate = (title: string, content: string) => {
    const newItem = {
      title,
      content,
      id: dataId.current++,
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
            </Routes>
          </div>
        </BrowserRouter>
      </RoutineDispatchContext.Provider>
    </RoutineStateContext.Provider>
  );
};

export default App;
