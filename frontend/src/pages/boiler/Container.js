import React, { useState, useEffect } from "react";
import axios from "axios";
// import {} from "../../services/api";

//import components
import Presenter from "./Presenter";

const Container = () => {
  const getData = async () => {};

  useEffect(() => {
    getData();
  }, []);

  return <Presenter />;
};

export default Container;
