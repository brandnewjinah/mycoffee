import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

//comp
import MenuItem from "../../components/MenuItem";

//data
import { homeMenu } from "../../data/menuData";

const HomePresenter = () => {
  return (
    <Wrapper>
      <Container>
        {homeMenu.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            label={item.title}
            link={item.link}
            desc={item.desc}
            delay={item.delay}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${Flex}
  flex-direction: column;
  padding: 0 2rem;
`;

export default HomePresenter;
