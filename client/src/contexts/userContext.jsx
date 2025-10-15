import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});


export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; 

    axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => setUser(data))
    .catch(() => setUser(null));
  }, []);

    const logout = async () => {
      try {
        await axios.post('/logout', {}, { withCredentials: true });
        localStorage.removeItem('user');
        setUser(null);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
  return (
      <UserContext.Provider value={ {user, setUser, logout} }>
        {children}
      </UserContext.Provider>
  );
}
