//1. Import React dependencies and the app from firebase.util
import React, { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import app, { googleProvider } from "./firebase.util";

//2. Create and export a React context called AuthContext using React.createContext()
export const AuthContext = React.createContext();

//3. Create and export AuthProvider which contains a React Context Provider.
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    console.log('userToken: ', userToken);

    if (!(userToken === null || userToken === undefined)) {
      loginWithToken(userToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log('user', user);
      if (!user) { logout(); } 
      else { 
        login(user);
      } 
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loginWithToken(userToken) {
      localStorage.setItem('user', JSON.stringify(userToken));
      setIsAuthenticated(true);
      setCurrentUser(userToken);
  }

  function login(user) {
      user.getIdToken().then((idToken) => {
        const modifiedUser = {...user, idToken: idToken}
        localStorage.setItem('user', JSON.stringify(modifiedUser));
        setIsAuthenticated(true);
        setCurrentUser(modifiedUser);
      })
      
  }

  function logout() {
      setIsAuthenticated(false);
      setCurrentUser(null);
      localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated,
        currentUser,
        isLoading,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};