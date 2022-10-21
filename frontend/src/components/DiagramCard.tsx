import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import Cups from "./Cups";
import { primaryColor } from "./token";

//interface
import { Ratio } from "../interfaces/interface";

interface Props {
  linkToRecipe?: string;
  imgsrc?: string;
  overline?: string;
  header?: string;
  caption?: string;
  ratio?: string;
  ratioData?: Ratio[];
}

export const DiagramCard: FC<Props> = ({
  linkToRecipe,
  overline,
  header,
  ratioData,
}) => {
  return (
    <Wrapper>
      <Link to={`${linkToRecipe}`}>
        <Cups data={ratioData} />
        <div>
          <Body variant="caption" color={primaryColor.orange}>
            {overline}
          </Body>
          <Body>{header}</Body>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.article<Props>`
  width: 100%;
  background-color: aliceblue;
`;
