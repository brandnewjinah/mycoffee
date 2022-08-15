import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

//comp
import Text from "./Text";
import { fontSize, neutral, primaryColor } from "./token";

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
          <Line>
            <Item>
              <p>Crema</p>
              <p className="value">{crema}</p>
            </Item>
            <Item>
              <p>Aroma</p>
              <p className="value">{aroma}</p>
            </Item>
          </Line>
          <Line>
            <Item>
              <p>Body</p>
              <p className="value">{body}</p>
            </Item>
            <Item>
              <p>Flavor</p>
              <p className="value">{flavor}</p>
            </Item>
          </Line>
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

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSize.sm1};
`;

const Item = styled.div`
  flex: 0 0 40%;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  color: ${neutral[500]};

  .value {
    color: ${primaryColor.orange};
  }
`;
