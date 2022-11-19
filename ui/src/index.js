import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext';
import { AlanProvider } from './AlanContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <UserProvider>
        <AlanProvider>
          <App />
        </AlanProvider>
      </UserProvider>
    </Router>
  </>
);
