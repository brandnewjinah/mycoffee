import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { neutral, primaryColor } from "./token";

//comp
import Text from "./Text";
import { Coffee } from "../assets/Icons";
import { Button } from "./Buttons";
import { link } from "fs";
import Cup from "./Cup";

//interface
import { Ratio } from "../interfaces/interface";

interface Props {
  linkToNote?: string;
  linkToBean?: string;
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
  ratio,
}) => {
  const history = useHistory();
  return (
    <Wrapper margin={margin}>
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
            color={primaryColor.blue}
            small
            handleClick={() => {
              history.push(`${linkToNote}`);
            }}
          />
        )}
      </Info>
    </Wrapper>
  );
};

export const DiagramCard: FC<Props> = ({
  linkToNote,
  linkToBean,
  imgsrc,
  overline,
  header,
  caption,
  margin,
  ratioData,
  ratio,
}) => {
  const history = useHistory();
  return (
    <Wrapper margin={margin}>
      <Link to={`${linkToBean}`}>
        {imgsrc ? (
          <Cup data={ratioData} />
        ) : (
          // <Preview ratio={ratio}>
          //   <Coffee width="24" height="24" color="#000" stroke="1" />
          // </Preview>
          <CupWrapper>
            <Cup data={ratioData} />
          </CupWrapper>
        )}
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
            color={primaryColor.blue}
            small
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

const CupWrapper = styled.div`
  padding: 0.5rem;
  background-color: bisque;
  width: 100%;
  height: 100%;
`;
