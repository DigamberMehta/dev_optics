import { createContext, useState } from 'react'; // Removed useEffect import
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const backendURL = 'http://localhost/dev_optics/api';

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
        headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error.response?.data?.message || error.message);
      setUser(null);
      localStorage.removeItem('token'); // Clear invalid token
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
      localStorage.setItem('token', response.data.token); // Store the token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info
      await fetchUser(); // Fetch user profile after successful registration
      return response; // Return the response
    } catch (error) {
      setIsError(error.response?.data?.message || 'Registration failed');
      return null; // Return null on error
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
      localStorage.setItem('token', response.data.token); // Store the token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info
      await fetchUser(); // Fetch user profile after successful login
      return response; // Return the response
    } catch (error) {
      setIsError(error.response?.data?.message || 'Login failed');
      return null; // Return null on error
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

  // Removed the initial useEffect for fetchUser
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