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
          <img alt="" src={props.item.image && props.item.image} />
        </ImageContainer>
        <Data>
          <h2>{props.item.name && props.item.name}</h2>
          <p>{props.item.description && props.item.description}</p>
        </Data>
      </Header>
      <Content>
        <Diagram>
          <Cup data={props.item.ratio} />
        </Diagram>
        <Instructions>
          <div>
            {props.item.ingredients && props.item.ingredients.length > 0 && (
              <Block>
                <div className="header">INGREDIENTS</div>
                {props.item.ingredients.map((ing, idx) => (
                  <div className="flex">
                    <div>{ing.ingredient}</div>
                    <div className="volume">{ing.amount}</div>
                  </div>
                ))}
              </Block>
            )}
            {props.item.directions && props.item.directions.length > 0 && (
              <Block>
                <div className="header">STEPS</div>
                {props.item.directions.map((dir, idx) => (
                  <div className="body">{`${idx + 1}. ${dir.text}`}</div>
                ))}
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
  margin-top: 2em;

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
  margin: 2em 0;
`;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { deleteCoffee, addNote, deleteNote })(
  RecipePresenter
);
