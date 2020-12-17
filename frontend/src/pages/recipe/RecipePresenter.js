import React from "react";
import { Link } from "react-router-dom";

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
import { gray } from "../../components/Colors";

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
          <Edit className="edit1">
            <Link to={`/recipe/edit/${props.item.id}`}>edit</Link>
          </Edit>
        </Diagram>
        <Instructions>
          <div className="block">
            {props.item.ingredients && props.item.ingredients.length > 0 && (
              <div>
                <div className="header">INGREDIENTS</div>
                {props.item.ingredients.map((ing, idx) => (
                  <div className="flex">
                    <div>{ing.ingredient}</div>
                    <div className="volume">{ing.amount}</div>
                  </div>
                ))}
              </div>
            )}
            {props.item.directions && props.item.directions.length > 0 && (
              <div className="block">
                <div className="header">DIRECTIONS</div>
                {props.item.directions.map((dir, idx) => (
                  <div className="flex2">
                    <div style={{ marginRight: `.5rem` }}>{idx + 1}.</div>
                    <div>{dir.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Edit className="edit2">
            <Link to={`/recipe/edit/${props.item.id}`}>edit</Link>
          </Edit>
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
`;

const Header = styled(Flex)`
  flex-direction: column;
  text-align: center;

  @media (max-width: 980px) {
    text-align: left;
  }
`;

const ImageContainer = styled.div`
  width: 50%;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 980px) {
    width: 100%;
  }
`;

const Data = styled.div`
  width: 50%;
  margin-top: 2em;

  h2 {
    font-size: 2rem;
    line-height: 2rem;
  }

  p {
    margin: 1em 0;
    color: ${gray.darkergray};
  }

  @media (max-width: 980px) {
    width: 100%;
    margin-top: 1em;

    h2 {
      font-size: 1.35rem;
    }

    p {
      font-size: 0.875rem;
      margin: 0;
    }
  }
`;

const Content = styled(Flex)`
  margin: 2em 0;

  .edit1 {
    display: none;
  }

  .edit2 {
    display: block;
  }

  @media (max-width: 980px) {
    flex-direction: column-reverse;
    margin: 0;

    .edit1 {
      display: block;
    }
    .edit2 {
      display: none;
    }
  }
`;

const Diagram = styled.div`
  width: 30%;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 980px) {
    width: 100%;
  }
`;

const Instructions = styled.div`
  border-left: 1px solid #e5e5e5;
  width: 70%;
  padding: 2em 0 0 2em;

  .header {
    font-size: 0.75rem;
    font-weight: 600;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    width: 60%;
    font-size: 0.875rem;
  }

  .flex2 {
    display: flex;
    width: 60%;
    font-size: 0.875rem;
  }

  .volume {
    color: #8c8c8c;
  }

  @media (max-width: 980px) {
    width: 100%;
    border-left: none;
    padding: 0;

    .block {
      margin: 2em 0;
    }

    .header {
      font-size: 0.875rem;
      letter-spacing: 0.1rem;
    }

    .flex {
      width: 100%;
      border-bottom: 1px solid ${gray.lightgray};
      padding: 0.5em 0;
    }

    .flex2 {
      width: 100%;
      border-bottom: 1px solid ${gray.lightgray};
      padding: 0.5em 0;
    }
  }
`;

const Edit = styled.div`
  font-size: 0.75rem;
  text-decoration: underline;
  color: #a8a8a8;
`;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { deleteCoffee, addNote, deleteNote })(
  RecipePresenter
);
