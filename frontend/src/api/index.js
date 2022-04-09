import axios from "axios";

export const URL = "http://localhost:5000";

export const publicRequest = axios.create({
  baseURL: URL,
});
