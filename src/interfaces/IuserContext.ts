import Iuser from "./Iuser";

export default interface IuserContext {
  user: string | null;
  token: string | null;
  setUser: (user: string | null) => void;
  setToken: (token: string | null) => void;
}
