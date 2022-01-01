import React from "react";

//comp
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";

const Note = () => {
  return (
    <div>
      <Header title="Note for Bean 123" />
      <Section>
        <div>date</div>
        <div>freshness</div>
        <div>dose</div>
        <div>grind</div>
        <div>time</div>
        <div>shot</div>
      </Section>
    </div>
  );
};

export default Note;
