import { createContext, useContext } from "react";
import io from "socket.io-client";
import config from "../config";

const socket = io(config.BASE_URL);

const SocketContext = createContext({ socket });

function SocketProvider(props: any) {
  return <SocketContext.Provider value={{ socket }} {...props} />;
}

export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
