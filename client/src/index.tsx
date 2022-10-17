import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import RoutineClient from './service/routine-client';
import React from 'react';

const httpClient = axios.create({
  baseURL: 'http://localhost:8000/',
});

const routineController = new RoutineClient(httpClient);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App routineController={routineController} />);
