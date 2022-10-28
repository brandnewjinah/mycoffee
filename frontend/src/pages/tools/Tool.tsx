import React, { useEffect, useState } from "react";
import * as api from "../../api";
import { useParams } from "react-router-dom";

//comp
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";
import { Section } from "../../components/container/Section";
import ImageContainer from "../../components/ImageContainer";

//interface
import { Tool } from "../../interfaces/toolInterface";
import { Link } from "../../components/Link";
import { Body } from "../../components/Text";

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const [toolData, setToolData] = useState<Tool>({
    name: "",
    brand: "",
    description: "",
    instructionsUrl: "",
    img: "",
  });

  // get this bean data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.publicRequest.get(`/tools/${toolId}`);
        setToolData(data);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, []);

  return (
    <Flex flexCol gap="1.5rem">
      <Header title={toolData.name} overlay={toolData.brand} />
      <Section gap="1rem">
        <ImageContainer imgUrl={toolData.img} />
        <Link
          buttonLink
          label="See Manual"
          linkUrl={`${toolData.instructionsUrl}`}
          blank
        />
        <Body variant="body_small">{toolData.description}</Body>
      </Section>
    </Flex>
  );
};

export default ToolDetail;
