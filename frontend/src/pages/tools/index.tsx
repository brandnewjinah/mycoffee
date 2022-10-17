import React from "react";
import { useHistory } from "react-router-dom";

//comp
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";

const Tools = () => {
  const history = useHistory();

  const handleNew = () => {
    history.push("/tools/new");
  };
  return (
    <Flex flexCol gap="2.5rem">
      <Header
        title="Tools"
        subtitle="Access manuals and tutorials."
        button
        btnLabel="New Tool"
        handleClick={handleNew}
      />
    </Flex>
  );
};

export default Tools;
