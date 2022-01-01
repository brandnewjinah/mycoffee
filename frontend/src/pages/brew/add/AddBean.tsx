import React from "react";
import styled from "styled-components";

//comp
import Header from "../../../components/Header";

const AddBean = () => {
  return (
    <Container>
      <Header title="What are you brewing today?" />
    </Container>
  );
};

const Container = styled.div`
  /* background-color: #7a2f2f; */
`;

export default AddBean;
