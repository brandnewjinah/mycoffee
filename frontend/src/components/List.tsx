import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

//comp
import Text from "./Text";
import { fontSize, neutral, primaryColor } from "./token";
import HorizontalBar from "./HorizontalBar";

interface Props {
  link?: string;
  date?: string;
  crema?: number;
  aroma?: number;
  body?: number;
  flavor?: number;
}

export const List: FC<Props> = ({ link, date, crema, aroma, body, flavor }) => {
  return (
    <Wrapper>
      <Link to={`${link}`}>
        <Text variant="caption">
          {moment(parseInt(date!)).format("MM-DD-YYYY")}
        </Text>
        <Content>
          <Item>
            <Text
              variant="caption"
              className="flexTwo"
              spacing=".1rem"
              uppercase
              bold
            >
              Crema
            </Text>
            <HorizontalBar value={crema!} className="flexFive" />
            <p className="value flexOne">{crema}</p>
          </Item>
          <Item>
            <Text
              variant="caption"
              className="flexTwo"
              spacing=".1rem"
              uppercase
              bold
            >
              Aroma
            </Text>
            <HorizontalBar value={aroma!} className="flexFive" />
            <p className="value flexOne">{aroma}</p>
          </Item>
          <Item>
            <Text
              variant="caption"
              className="flexTwo"
              spacing=".1rem"
              uppercase
              bold
            >
              Body
            </Text>
            <HorizontalBar value={body!} className="flexFive" />
            <p className="value flexOne">{body}</p>
          </Item>
          <Item>
            <Text
              variant="caption"
              className="flexTwo"
              spacing=".1rem"
              uppercase
              bold
            >
              Flavor
            </Text>
            <HorizontalBar value={flavor!} className="flexFive" />
            <p className="value flexOne">{flavor}</p>
          </Item>
        </Content>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  border-bottom: 1px solid ${neutral[100]};
  padding-bottom: 1.25rem;
`;

const Content = styled.div`
  padding: 0.5rem 0;
`;

const Item = styled.div`
  flex: 0 0 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: ${neutral[500]};

  .flexOne {
    flex: 1;
  }

  .flexTwo {
    flex: 2;
  }

  .flexFive {
    flex: 5;
  }

  .value {
    font-size: ${fontSize.sm2};
    font-weight: bold;
    text-align: end;
    color: ${primaryColor.orange};
  }
`;
