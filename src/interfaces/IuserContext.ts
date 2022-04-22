import Iuser from "./Iuser";

export default interface IuserContext {
  user: string | null;
  setUser: (user: string) => void;
}