import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RoutineControllerProvider } from './common/context/RoutineControllerContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<RoutineControllerProvider>
		<App />
	</RoutineControllerProvider>,
);
