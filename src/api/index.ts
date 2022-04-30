import axios from "axios";
import { InewUser } from "../interfaces/Iuser";

const baseURL = "http://localhost:1337";

const register = async (credentials: InewUser) =>
  axios.post(`${baseURL}/api/user/register`, credentials);

const login = async (credentials: InewUser) =>
  axios.post(`${baseURL}/api/user/login`, credentials);

const validate = async (token: string) =>
  axios.get(`${baseURL}/api/user/validate`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const api = { register, login, validate };
export default api;
