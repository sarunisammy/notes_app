import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './component/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
    <Routes>
      <Route>
        <Route index element={ <App />}/>
      
      </Route>
    </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);


