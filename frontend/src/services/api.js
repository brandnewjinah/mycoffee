import axios from "axios";

//local data
import { quizContents } from "../data/data";

const postData = async (path, data, options) => {
  await axios
    .post(path, data, options)
    .then((res) => {
      if (res.status === 200) {
        alert("successful");
      }
    })
    .catch((err) => {
      alert(err);
    });
};

export const quizApi = {
  quiz: quizContents,
  postQuiz: (data, options) =>
    postData("http://localhost:5000/profile", data, options),
};

export const productApi = {
  getAll: () => axios.get("http://localhost:5000/product"),
  getDetail: (id) => axios.get(`http://localhost:5000/product/${id}`),
};
