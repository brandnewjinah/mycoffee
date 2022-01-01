import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

//comp
import Text from "./Text";
import { neutral, primaryColor, fontSize } from "./token";

interface Props {
  label: string;
  link?: string;
  id?: number;
  desc?: string;
  delay?: number;
}

const MenuItem: FC<Props> = ({ label, link, id, desc, delay }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Item
      to={{ pathname: link }}
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay={delay}
    >
      <Title data-aos="fade-up" data-aos-duration="800">
        <span className="sub">{`0${id}`}</span>
        <Text type="h2">{label}</Text>
      </Title>
      {desc && <Desc>{desc}</Desc>}
    </Item>
  );
};

const Item = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${neutral[200]};
  padding: 1rem 0;
  cursor: pointer;

  &:hover {
    color: ${primaryColor.gold};
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  .sub {
    font-size: ${fontSize.sm2};
    margin-right: 0.5rem;
  }
`;

const Desc = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  font-size: ${fontSize.sm2};
  font-weight: 400;
  line-height: 1.25rem;
`;

export default MenuItem;
