import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { quizApi } from "../../services/api";

import QuizPresenter from "./QuizPresenter";

//redux
import { connect } from "react-redux";

const QuizContainer = (props) => {
  const history = useHistory();
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
    //connect to server
    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await quizApi.postQuiz(profile, options);

    //redirect (both redux and server)
    history.push("/collection");
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
