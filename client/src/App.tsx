import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import RoutineClient from './service/routine-client';

export interface IAppProps {
	routineController: RoutineClient;
}
const App = ({ routineController }: IAppProps) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Intro />} />
				<Route path="/main" element={<Main routineController={routineController} />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
