import React from "react";
import { Link } from "react-router-dom";

//comp
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";

const Saved = () => {
  return (
    <div>
      <Header title="Beans" />
      <Section>
        <div>
          <Link to="/brew/123">Bean123</Link>
        </div>
      </Section>
    </div>
  );
};

export default Saved;
