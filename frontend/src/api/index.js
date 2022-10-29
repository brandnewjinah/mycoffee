import axios from "axios";

export const URL = "https://coffee-duph.onrender.com";

export const publicRequest = axios.create({
  baseURL: URL,
});
