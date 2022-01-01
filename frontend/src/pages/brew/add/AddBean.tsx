import React from "react";
import styled from "styled-components";

//comp
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Section } from "../../../components/container/Section";

const AddBean = () => {
  const handleChange = () => {};

  return (
    <Container>
      <Header title="What are you brewing today?" />
      <Section>
        <Input label="Roaster" name="roaster" onChange={handleChange} />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  /* background-color: #7a2f2f; */
`;

export default AddBean;
