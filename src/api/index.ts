import axios from "axios";
import { InewUser } from "../interfaces/Iuser";
import config from "../config";

const register = async (credentials: InewUser) =>
  axios.post(`${config.BASE_URL}/api/user/register`, credentials);

const login = async (credentials: InewUser) =>
  axios.post(`${config.BASE_URL}/api/user/login`, credentials);

const validate = async (token: string) =>
  axios.get(`${config.BASE_URL}/api/user/validate`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const api = { register, login, validate };
export default api;
