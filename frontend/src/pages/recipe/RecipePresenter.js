import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

//import components
import Cup from "../../components/Cup";

//import redux
import { connect } from "react-redux";
import {
  deleteCoffee,
  addNote,
  deleteNote,
} from "../../reducers/collectionReducer";

//import styles
import styled from "styled-components";

const RecipePresenter = (props) => {
  return (
    <Container>
      <Header>
        <ImageContainer>
          <img
            alt=""
            src={
              props.item.image
                ? props.item.image
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
            }
          />
        </ImageContainer>
        <Data>
          <h4>{props.item.roaster && props.item.roaster}</h4>
          <h2>Americano</h2>
          <p>{props.item.description && props.item.description}</p>
        </Data>
      </Header>
      <Content>
        <Diagram>
          <Cup />
        </Diagram>
        <Instructions>
          <div>
            {props.item.origin && (
              <Block>
                <div className="header">INGREDIENTS</div>
                <div className="flex">
                  <div>Ground Coffee</div>
                  <div className="volume">18-20g</div>
                </div>
                <div className="flex">
                  <div>Hot Water</div>
                  <div className="volume">120ml</div>
                </div>
              </Block>
            )}

            {props.item.roast && (
              <Block>
                <div className="header">STEPS</div>
                <div className="body">
                  1. Make espresso. It should yield 30ml in 25-30 seconds
                </div>
                <div className="body">2. Add hot water to the espresso</div>
              </Block>
            )}

            {props.item.flavor && (
              <Block>
                <div className="header">Flavor</div>
                <div className="body">
                  {props.item.flavor.map((f, idx) => (
                    <Flavor key={idx}>{f.label}</Flavor>
                  ))}
                </div>
              </Block>
            )}
          </div>

          <div
            style={{
              fontSize: `.75rem`,
              textDecoration: `underline`,
              color: `#a8a8a8`,
            }}
          >
            <Link to={`/edit/${props.item.id}`}>edit</Link>
          </div>
        </Instructions>
      </Content>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Header = styled(Flex)`
  flex-direction: column;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 50%;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const Data = styled.div`
  width: 50%;

  h2 {
    font-size: 2rem;
    line-height: 2rem;
  }

  h4 {
    font-size: 1rem;
  }

  p {
    margin: 1em 0;
  }
`;

const Block = styled.div`
  margin-bottom: 1em;

  .flex {
    display: flex;
    justify-content: space-between;
    width: 60%;
    font-size: 0.875rem;
  }

  .volume {
    color: #8c8c8c;
  }

  .header {
    font-size: 0.75rem;
    font-weight: 600;
  }

  .body {
    font-size: 0.875rem;
  }
`;

const Flavor = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.025rem;
  background-color: #eee;
  border-radius: 1em;
  padding: 0.25em 0.75em;
  margin-left: 0.5em;
  margin-top: 0.125em;

  &:first-child {
    margin-left: 0;
  }
`;

const Diagram = styled.div`
  width: 50%;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const Instructions = styled.div`
  width: 50%;

  h2 {
    font-size: 2rem;
    line-height: 2rem;
  }

  h4 {
    font-size: 1rem;
  }

  p {
    margin: 1em 0;
  }
`;

const Content = styled(Flex)`
  margin: 4em 0;
`;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { deleteCoffee, addNote, deleteNote })(
  RecipePresenter
);
