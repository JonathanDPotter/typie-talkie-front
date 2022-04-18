import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import SocketProvider from "./context/socket.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
