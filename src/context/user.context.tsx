import { createContext, useContext, useReducer, useState } from "react";
// interfaces
import Iuser from "../interfaces/Iuser";
import IuserContext from "../interfaces/IuserContext";

const UserContext = createContext<IuserContext>({
  user: null,
  setUser: () => {},
});

const UserProvider = (props: any) => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
