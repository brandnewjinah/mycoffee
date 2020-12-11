import axios from "axios";

//local data
import { quizContents } from "../data/data";

export const quizApi = {
  quiz: quizContents,
};

export const productApi = {
  getAll: () => axios.get("http://localhost:5000/product"),
  getDetail: (id) => axios.get(`http://localhost:5000/product/${id}`),
};
