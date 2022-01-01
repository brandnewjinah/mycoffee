import React from "react";
import { Link } from "react-router-dom";

//comp
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";

const Bean = () => {
  return (
    <div>
      <Header title="Notes for Bean 123" />
      <Section>
        <div>
          <Link to="/brew/123/1">note 1</Link>
        </div>
      </Section>
    </div>
  );
};

export default Bean;
