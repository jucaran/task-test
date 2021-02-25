import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa1XBHyTBE3bonpdoWaj59qlrwOc9dVos",
  authDomain: "task-test-api.firebaseapp.com",
  projectId: "task-test-api",
  storageBucket: "task-test-api.appspot.com",
  messagingSenderId: "724153991861",
  appId: "1:724153991861:web:9a3c37806555b1e55eb4fc",
};

const googleProvider = new firebase.auth.GoogleAuthProvider();

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();

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

export default AuthProvider;
