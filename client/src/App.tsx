import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './common/auth/Auth';
import { RoutineProvider } from './common/context/RoutineContext';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Price from './pages/Price';
import SignUp from './pages/SignUp';

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<RoutineProvider>
					<Routes>
						<Route path="/" element={<Intro />} />
						<Route path="/main" element={<Main />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/price" element={<Price />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</RoutineProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
