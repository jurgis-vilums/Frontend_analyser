import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Input from './Input';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    <App />
    <Input />
  </React.StrictMode>
);