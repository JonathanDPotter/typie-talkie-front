import React, { useContext } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { useUser } from "./context/user.context";

const App = () => {
  // get user from context
  const { user } = useUser();

  return (
    <>
      <Header />
      {user ? <Home /> : <Login />}
    </>
  );
};

export default App;
