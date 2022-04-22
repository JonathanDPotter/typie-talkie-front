import axios from "axios";
import { InewUser } from "../interfaces/Iuser";

const baseURL = "http://localhost:1337";

const register = async (credentials: InewUser) => axios.post(`${baseURL}/api/user/register`, credentials);

const api = { register };
export default api;
