import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});


export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // axios.get('/profile')
        // .then(({ data }) => setUser(data))  setUser(data.user))
        // .catch(() => setUser(null));
    } , [])

  return (
      <UserContext.Provider value={ {user, setUser} }>
        {children}
      </UserContext.Provider>
  );
}
