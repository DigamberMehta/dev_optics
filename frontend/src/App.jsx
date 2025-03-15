import React from 'react';
import Login from './pages/Login';
import { AuthProvider } from './context/authContext';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar /> 
        <Outlet />
      </AuthProvider>
    </>
  );
};

export default App;