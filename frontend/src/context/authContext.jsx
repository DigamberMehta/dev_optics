import { createContext, useState, useEffect } from 'react'; // Added useEffect back
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const backendURL = 'http://localhost/dev_optics/api';

  // Add useEffect hook to check auth status on mount
  useEffect(() => {
    fetchUser();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const fetchUser = async () => {
    setIsLoading(true);
    setIsError(null);
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${backendURL}/profile.php`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error.response?.data?.message || error.message);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await axios.post(`${backendURL}/register.php`, userData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      await fetchUser();
      return response;
    } catch (error) {
      setIsError(error.response?.data?.message || 'Registration failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Login User
  const loginUser = async (credentials) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await axios.post(`${backendURL}/login.php`, credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      await fetchUser();
      return response;
    } catch (error) {
      setIsError(error.response?.data?.message || 'Login failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout User
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isError,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;