import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";

export const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
  signup: () => {},
  login: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const loginWithGoogle = () => {
    return auth.signInWithPopup(googleProvider);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
