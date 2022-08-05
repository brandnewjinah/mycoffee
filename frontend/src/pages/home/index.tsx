import React from "react";

//comp
import { Wrapper, Container } from "../../components/container/Container";
import MenuItem from "../../components/MenuItem";

//data
import { homeMenu } from "../../data/menuData";

const Home = () => {
  return (
    <Wrapper height="calc(100vh - 120px)">
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

export default Home;
