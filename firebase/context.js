//1. Import React dependencies and the app from firebase.util
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase.util";

//2. Create and export a React context called AuthContext using React.createContext()
export const AuthContext = React.createContext();

//3. Create and export AuthProvider which contains a React Context Provider.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};