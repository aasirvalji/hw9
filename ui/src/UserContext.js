import React, { useEffect, createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  function getAuth() {
    return data && !loading && localStorage.getItem('token');
  }

  return (
    <UserContext.Provider
      value={{ data, setData, loading, setLoading, getAuth }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
