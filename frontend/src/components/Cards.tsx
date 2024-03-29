import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import ImageContainer from "./ImageContainer";
import { Button } from "./Buttons";
import { neutral, primaryColor } from "./token";

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
          <Body variant="body_xsmall" capitalize color={primaryColor.orange}>
            {overline}
          </Body>
          <Body bold>{header}</Body>
          <Body variant="body_xsmall" capitalize color={neutral[300]}>
            {caption}
          </Body>
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
