import axios from "axios";

export const URL = "https://coffee-duph.onrender.com";
// export const URL = "http://localhost:5500";

export const publicRequest = axios.create({
  baseURL: URL,
});
