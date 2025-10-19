import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  UserContextProvider from './contexts/userContext.jsx';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Dashboard from './pages/dashboard.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Router>
      <UserContextProvider>
        <Toaster 
          position="top-right" 
          reverseOrder={true} 
          toastOptions={{ duration: 2000 }} 
        /> 
        <Routes>
          <Route path='/register' element={ <Register/> } ></Route>
          <Route path='/login' element={ <Login/> } ></Route>
          <Route path='/dashboard' element={ <Dashboard/> } ></Route>
        </Routes>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
