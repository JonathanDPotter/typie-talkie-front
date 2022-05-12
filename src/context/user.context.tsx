import { createContext, useContext, useReducer, useState } from "react";
// interfaces
import Iuser from "../interfaces/Iuser";
import IuserContext from "../interfaces/IuserContext";

const UserContext = createContext<IuserContext>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

const UserProvider = (props: any) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const value = { user, token, setUser, setToken };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => useContext(UserContext);


export default UserProvider;
