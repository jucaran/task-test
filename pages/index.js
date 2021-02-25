import React, { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import Home from "./home";
import Login from "./login";

export default function App() {
  const { user, setUser } = useContext(AuthContext);

  if (user) return <Home />;
  else return <Login />;
}
