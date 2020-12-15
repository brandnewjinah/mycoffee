import React, { useEffect } from "react";
// import {} from "../../services/api";

//import components
import ToolPresenter from "./ToolPresenter";
// import ToolPresenter from "./ToolPresenter2";

const ToolContainer = () => {
  const getData = async () => {};

  useEffect(() => {
    getData();
  }, []);

  return <ToolPresenter />;
};

export default ToolContainer;
