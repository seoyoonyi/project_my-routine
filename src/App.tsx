import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RoutineStateContext } from './context/RoutineStateContext';
import Home from './pages/home';
import RoutineEditor from './pages/routineEditor';

const App = () => {
  const [onAdd, setOnAdd] = useState(false);
  const routineToggle = () => {
    setOnAdd(!onAdd);
  };
  const routineSave = () => routineToggle();
  return (
    <RoutineStateContext.Provider value={{ routineSave, routineToggle, onAdd }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<RoutineEditor />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RoutineStateContext.Provider>
  );
};

export default App;
