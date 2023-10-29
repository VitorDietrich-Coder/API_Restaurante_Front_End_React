import { createContext, useEffect, useState } from "react";
import React from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const hasUser =  JSON.parse(userToken).userToken

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (userToken) => {    
        localStorage.setItem("user_token", JSON.stringify({ userToken }));
        setUser({ userToken });
        return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
