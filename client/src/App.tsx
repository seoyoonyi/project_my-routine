import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Intro from './pages/Intro';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import RoutineClient from './service/routine-client';

export interface IAppProps {
  routine: RoutineClient;
}
const App = ({ routine }: IAppProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main routine={routine} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
