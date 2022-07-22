import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DatePicker } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
    <DeleteOutlined />
      <DatePicker />
      <App />
    </>
);

