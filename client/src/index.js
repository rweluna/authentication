import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  UserContextProvider from './contexts/userContext.jsx';
import { Toaster } from 'react-hot-toast';
import Register from './pages/register.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Backend port
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials =true

root.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <Toaster 
          position="top-right" 
          reverseOrder={true} 
          toastOptions={{ duration: 2000 }} 
        /> 
        <Routes>
          <Route path='/register' element={ <Register/> } ></Route>
        </Routes>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
