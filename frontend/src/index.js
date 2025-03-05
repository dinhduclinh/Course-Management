import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import "bootstrap/dist/css/bootstrap.min.css";

// Tạo root cho ứng dụng
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render ứng dụng vào DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);