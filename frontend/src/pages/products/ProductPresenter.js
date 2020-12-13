import React from "react";

//import components
import { Card } from "../../components/Card";
import { Section } from "../../components/Section";

//redux
// import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";

const ProductPresenter = (props) => {
  console.log(props.products);
  return (
    <Wrapper>
      <Header>
        <h2>Products</h2>
      </Header>

      <Collection>
        <Section>
          {props.products &&
            props.products.map((p, idx) => (
              <Card
                key={idx}
                id={p.id}
                imageUrl={p.image}
                roaster={p.roaster}
                name={p.name}
                roast={p.roast}
                toDetail={true}
              />
            ))}
        </Section>
      </Collection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 3em auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }
`;

const Collection = styled.div`
  width: 100%;
  margin: 3em auto;
`;

export default ProductPresenter;
