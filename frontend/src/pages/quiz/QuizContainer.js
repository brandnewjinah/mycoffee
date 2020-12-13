import React, { useEffect, useState } from "react";
import { quizApi } from "../../services/api";
import axios from "axios";

import QuizPresenter from "./QuizPresenter";

//redux
import { connect } from "react-redux";

const QuizContainer = (props) => {
  const [quiz, setQuiz] = useState({});
  const [page, setPage] = useState(1);
  const [length, setLength] = useState();

  const getData = async () => {
    const quiz = await quizApi.quiz;
    setLength(quiz.length);
    const result = quiz.find((item) => item.page === page);
    setQuiz({ quiz: result });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = (profile) => {
    if (page === length) {
      postData(profile);
    } else {
      setPage(page + 1);
    }
  };

  const postData = async (profile) => {
    window.location = "/collection";

    // //connect to server
    // const token = localStorage.getItem("token");

    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    // await axios
    //   .post("http://localhost:5000/profile", profile, options)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       window.location = "/home";
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

  return (
    <QuizPresenter
      {...quiz}
      handleNext={(profile) => handleNext(profile)}
      handlePrev={handlePrev}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state,
  };
};

export default connect(mapStateToProps, null)(QuizContainer);
