import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//comp
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Section } from "../../../components/container/Section";

const AddBean = () => {
  const history = useHistory();
  const handleChange = () => {};
  const handleClick = () => {
    history.push("/brew/note");
  };

  return (
    <Container>
      <Header title="What are you brewing today?" />
      <Section>
        <Input label="Roaster" name="roaster" onChange={handleChange} />
        <Input label="Name" name="name" onChange={handleChange} />
        <span>roast level: light, medium, dark</span>
      </Section>
      <button onClick={handleClick}>next</button>
    </Container>
  );
};

const Container = styled.div``;

export default AddBean;
