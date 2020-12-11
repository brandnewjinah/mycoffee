import React, { useState, useEffect } from "react";
import axios from "axios";
// import {} from "../../services/api";

//import components
import AddPresenter from "./AddPresenter";

const AddContainer = () => {
  const getData = async () => {};

  useEffect(() => {
    getData();
  }, []);

  const postData = async (product) => {
    // window.location = "/home";
    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post("http://localhost:5000/product", product, options)
      .then((res) => {
        if (res.status === 200) {
          window.location = "/home";
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return <AddPresenter postData={(product) => postData(product)} />;
};

export default AddContainer;
