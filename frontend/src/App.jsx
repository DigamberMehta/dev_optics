import React from 'react';
import Login from './pages/Login';
import { AuthProvider } from './context/authContext';
import { Outlet, ScrollRestoration } from 'react-router-dom'; // Import ScrollRestoration
import Navbar from './components/Navbar'; // Import Navbar

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <ScrollRestoration />  
        <Outlet />
      </AuthProvider>
    </>
  );
};

export default App;