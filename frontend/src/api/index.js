import axios from "axios";

export const URL = "/data";

export const publicRequest = axios.create({
  baseURL: URL,
});
