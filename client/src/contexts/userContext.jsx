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

  return (
      <UserContext.Provider value={ {user, setUser} }>
        {children}
      </UserContext.Provider>
  );
}
