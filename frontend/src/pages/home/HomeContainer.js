import React, { useState, useEffect } from "react";
import axios from "axios";
// import {} from "../../services/api";

//import components
import HomePresenter from "./HomePresenter";

const HomeContainer = () => {
  const [data, setData] = useState({});

  const getData = async () => {
    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get("http://localhost:5000/profile", options)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return <HomePresenter {...data} />;
};

export default HomeContainer;
