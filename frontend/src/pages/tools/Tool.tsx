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
import { LinkButton } from "../../components/Buttons";
import Link from "../../components/Link";

interface Props {
  ratio?: string;
}

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
      <Section>
        <ImageContainer imgUrl={toolData.img} />
        <p>{toolData.description}</p>
        <Link
          label="See Manual"
          linkUrl={`${toolData.instructionsUrl}`}
          blank
        />
      </Section>
    </Flex>
  );
};

export default ToolDetail;
