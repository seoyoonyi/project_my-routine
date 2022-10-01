import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  RoutineStateContext,
  IRoutineState,
} from './context/RoutineStateContext';
import { RoutineDispatchContext } from './context/RoutineDispatchContext';
import Home from './pages/home';
import RoutineEditor from './components/routineEditor';
import Routine from './pages/routine';

const App = () => {
  const [data, setData] = useState<IRoutineState>([]);
  const [onAdd, setOnAdd] = useState(false);
  const dataId = useRef(0);
  const location = useLocation();
  const background = location.state && location.state.background;

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
  };

  return (
    <RoutineStateContext.Provider value={data}>
      <RoutineDispatchContext.Provider
        value={{
          routineSave,
          routineToggle,
          onAdd,
          onCreate,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes location={!background || location}>
              <Route path="/" element={<Home />}>
                {background && (
                  <Route path="/routine/:id" element={<Routine />} />
                )}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </RoutineDispatchContext.Provider>
    </RoutineStateContext.Provider>
  );
};

export default App;
