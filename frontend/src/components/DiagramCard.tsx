import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import Cups from "./Cups";
import CupsVariety from "./CupsVariety";
import { primaryColor } from "./token";

//interface
import { Ratio } from "../interfaces/recipeInterface";

interface Props {
  linkToRecipe?: string;
  imgsrc?: string;
  overline?: string;
  header?: string;
  caption?: string;
  ratio?: string;
  ratioData?: Ratio[];
  type?: string;
}

export const DiagramCard: FC<Props> = ({
  linkToRecipe,
  overline,
  header,
  ratioData,
  type,
}) => {
  const volume =
    ratioData &&
    ratioData.reduce((sum, ratio) => sum + parseInt(ratio.value), 0);

  return (
    <Wrapper>
      <Link to={`${linkToRecipe}`}>
        {/* <Cups data={ratioData} /> */}
        <CupsVariety data={ratioData} type={type} volume={volume} />
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
