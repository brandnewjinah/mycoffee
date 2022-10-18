import React from "react";
import { Flex } from "../../components/container/Div";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";

const EditBeanDetails = () => {
  return (
    <div>
      <Flex flexCol gap="2.5rem">
        <Header title="Edit Bean" />
        <Section>
          <div>Flavor</div>
          <div>Process</div>
          <div>Region</div>
          <div>Variety</div>
          <div>Roaster's Notes</div>
        </Section>
      </Flex>
    </div>
  );
};

export default EditBeanDetails;
