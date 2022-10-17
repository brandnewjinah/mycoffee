import React from "react";

//comp
import { Div, Flex } from "../../components/container/Div";
import MenuItem from "../../components/MenuItem";

//data
import { homeMenu } from "../../data/menuData";

const Home = () => {
  return (
    <Div height="calc(100vh - 120px)">
      <Flex flexCol>
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
      </Flex>
    </Div>
  );
};

export default Home;
