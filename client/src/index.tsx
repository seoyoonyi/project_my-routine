import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import RoutineClient from './service/routineClient';

const httpClient = axios.create({
  baseURL: 'http://localhost:8000/',
});

const routine = new RoutineClient(httpClient);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App routine={routine} />);
