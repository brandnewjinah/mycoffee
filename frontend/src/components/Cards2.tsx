import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import Text from "./Text";
import Cup from "./Cup2";
import { primaryColor } from "./token";

//interface
import { Ratio } from "../interfaces/interface";

interface Props {
  linkToRecipe?: string;
  imgsrc?: string;
  overline?: string;
  header?: string;
  caption?: string;
  margin?: string;
  ratio?: string;
  ratioData?: Ratio[];
}

export const DiagramCard: FC<Props> = ({
  linkToRecipe,
  overline,
  header,
  margin,
  ratioData,
}) => {
  return (
    <Wrapper>
      <Link to={`${linkToRecipe}`}>
        <CupWrapper>
          <Cup data={ratioData} />
        </CupWrapper>
        <Info>
          <div>
            <Text variant="caption" color={primaryColor.orange}>
              {overline}
            </Text>
            <Text>{header}</Text>
          </div>
        </Info>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.article<Props>`
  width: 100%;
`;

const CupWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
