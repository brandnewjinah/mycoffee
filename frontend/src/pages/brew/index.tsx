import React from "react";
import styled from "styled-components";

//comp
import MenuItem from "../../components/MenuItem";

//data
import { prepMenu } from "../../data/menuData";

const Brew = () => {
  return (
    <Wrapper>
      <Container>
        {prepMenu.map((item, idx) => (
          <MenuItem
            key={item.id}
            id={item.id}
            label={item.title}
            desc={item.desc}
            link={item.link}
            delay={item.delay}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 2rem;
`;

export default Brew;
