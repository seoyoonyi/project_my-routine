import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { APIControllerProvider } from './common/context/APIControllerProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<APIControllerProvider>
		<App />
	</APIControllerProvider>,
);
