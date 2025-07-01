import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   
  const [userInfo, setUserInfo] = useState(null)
  const [token, setToken] = useState(null);  
  const [loading, setLoading] = useState(true); // ✅

  const navigate = useNavigate();


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser)); 
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
    setLoading(false); 
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:2000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(res.data.userinfo);
        
      } catch (err) {
        if (err.response?.status === 401) {
        logout();
        }
      }
    };

    fetchUserData();
  }, [token]);

  const login = (userData, tokenData) => {
    localStorage.clear();
    setToken(tokenData);
    setUser(userData);
    localStorage.setItem('token', tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, userInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
