import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MasterContext = createContext();

const MasterProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const bgcolor = '#E08E45';
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    } else {
      sessionStorage.removeItem('token');
    }
  }, [token]);

  return (
    <MasterContext.Provider value={{ bgcolor, token, setToken }}>{children}</MasterContext.Provider>
  );
};

export default MasterProvider;
