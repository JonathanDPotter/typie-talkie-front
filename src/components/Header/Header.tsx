import React from "react";
import { useSockets } from "../../context/socket.context";
// utils
import { useUser } from "../../context/user.context";
// styles
import "./Header.scss";

const Header = () => {
  const { setUser, setToken, user } = useUser();
  const { socket } = useSockets();

  const handleLogOut = () => {
    socket.emit("disconnected", {name: user})
    setToken(null);
    setUser(null);
  };

  return (
    <header>
      <h1>
        Typie-Talkie<span className="fa fa-bullhorn"></span>
      </h1>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
  );
};

export default Header;
