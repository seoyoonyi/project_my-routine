import React, { useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import RoutineEditor from './pages/routineEditor';

const App = () => {
  const [onAdd, setOnAdd] = useState(false);
  const routineAdd = () => {
    setOnAdd((onAdd) => !onAdd);
  };
  const routineSave = () => routineAdd();
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home routineAdd={routineAdd} onAdd={onAdd} />}
          />
          <Route
            path="/edit"
            element={<RoutineEditor routineSave={routineSave} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
