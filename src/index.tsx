import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import SocketContextProvider from "./context/socket.context";
import UserContextProvider from "./context/user.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </UserContextProvider>
);
