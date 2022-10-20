import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { neutral, primaryColor } from "./token";

//comp
import Text from "./Text";
import { Coffee } from "../assets/Icons";
import ImageContainer from "./ImageContainer";
import { Button } from "./Buttons";

//interface
import { Ratio } from "../interfaces/interface";

interface Props {
  linkToNote?: string;
  linkToBean?: string;
  linkToRecipe?: string;
  imgsrc?: string;
  overline?: string;
  header?: string;
  caption?: string;
  margin?: string;
  ratio?: string;
  ratioData?: Ratio[];
}

export const Card: FC<Props> = ({
  linkToNote,
  linkToBean,
  imgsrc,
  overline,
  header,
  caption,
  margin,
}) => {
  const history = useHistory();
  return (
    <Wrapper margin={margin}>
      <Link to={`${linkToBean}`}>
        <ImageContainer imgUrl={imgsrc} />
      </Link>
      <Info>
        <Link to={`${linkToBean}`}>
          <Text variant="caption" color={primaryColor.orange}>
            {overline}
          </Text>
          <Text>{header}</Text>
          <Text variant="caption" color={neutral[300]}>
            {caption}
          </Text>
        </Link>
        {linkToNote && (
          <Button
            label="Add Note"
            variant="primary"
            size="small"
            handleClick={() => {
              history.push(`${linkToNote}`);
            }}
          />
        )}
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.article<Props>`
  display: grid;
  gap: 0.25rem;
  width: 100%;
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
