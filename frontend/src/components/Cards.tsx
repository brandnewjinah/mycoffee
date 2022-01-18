import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { neutral, primaryColor } from "./token";

//comp
import Text from "./Text";
import { Coffee } from "../assets/Icons";
import { Button } from "./Buttons";

interface Props {
  linkToNote?: string;
  linkToBean?: string;
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
  ratio,
}) => {
  const history = useHistory();
  return (
    <Wrapper margin={margin}>
      <Info>
        <Link to={`${linkToBean}`}>
          {imgsrc ? (
            <Preview ratio={ratio}>
              <img src={imgsrc} alt="" />
            </Preview>
          ) : (
            <Preview ratio={ratio}>
              <Coffee width="24" height="24" color="#000" stroke="1" />
            </Preview>
          )}
          <Text variant="caption" color={primaryColor.orange}>
            {overline}
          </Text>
          <Text>{header}</Text>
          <Text variant="caption" color={neutral[300]}>
            {caption}
          </Text>
        </Link>
      </Info>
      <Button
        label="Add Note"
        variant="primary"
        color={primaryColor.turquoise}
        handleClick={() => {
          history.push(`${linkToNote}`);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section<Props>`
  display: grid;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const Info = styled.div`
  text-align: center;
`;

const Preview = styled.div<Props>`
  position: relative;
  display: block;
  max-width: 100%;
  border: 1px solid ${neutral[100]};
  margin-bottom: 0.75rem;

  &:before {
    content: "";
    display: block;
    padding-bottom: ${(props) => props.ratio && props.ratio};
    width: 100%;
  }

  img {
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid ${neutral[100]};
  border-radius: 0.5rem;

  img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    transition: opacity 0.1s linear;
  }
`;
