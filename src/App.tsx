import React, { useContext } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { useUser } from "./context/user.context";

const App = () => {
  const { user } = useUser();

  return user ? <Home /> : <Login />;
};

export default App;
