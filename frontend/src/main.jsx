import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // أضيفي هذا السطر
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* غلفي التطبيق هنا */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);