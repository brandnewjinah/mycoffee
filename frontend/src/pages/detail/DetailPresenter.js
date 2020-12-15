import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

//import components
import { Input } from "../../components/Input";
import { DetailCard } from "../../components/Card";
import Table from "../../components/Table";

//import redux
import { connect } from "react-redux";
import {
  deleteCoffee,
  addNote,
  deleteNote,
} from "../../reducers/collectionReducer";

//imprt data
import { testTable } from "../../data/data";

//import styles
import styled from "styled-components";
import { Button } from "../../components/Button";

//토큰에 있는 유저정보와 note의 유저정보를 match 해서 맞으면 note 가 보이게. 아니면 null.

const DetailPresenter = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
    text: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const postComment = async () => {
    const token = localStorage.getItem("token");
    const id = props.id;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post(`http://localhost:5000/product/comment/${id}`, data, options)
      .then((res) => {
        if (res.status === 200) {
          window.location = "/home";
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const editCoffee = () => {
    // props.deleteCoffee(props.item);
    // window.location = "/collection";
  };

  const postNote = (note) => {
    let id = props.item.notes.length + 1;
    const thisNote = { ...note, coffeeId: props.item.id, id: id };
    props.addNote(thisNote);
    history.go(0);
  };

  const deleteNote = (note) => {
    props.deleteNote(note);
    history.go(0);
  };

  return (
    <Container>
      <Content>
        <Header>
          <ImageContainer>
            <Image
              src={
                props.item.image
                  ? props.item.image
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
              }
            />
          </ImageContainer>
          <Data>
            <h4>{props.item.roaster && props.item.roaster}</h4>
            <h2>{props.item.name && props.item.name}</h2>
            <p>{props.item.description && props.item.description}</p>
            <Link to={`/edit/${props.item.id}`}>
              <div>Edit</div>
            </Link>
          </Data>
        </Header>
        <More>
          {props.item.origin && (
            <DetailCard header="Origin">
              <span>{props.item.origin}</span>
            </DetailCard>
          )}
          {props.item.roast && (
            <DetailCard header="Roast Level">
              {props.item.roast.map((r, idx) => (
                <span key={idx}>{r.label}</span>
              ))}
            </DetailCard>
          )}
          {props.item.flavor && (
            <DetailCard header="Flavor">
              <Flavor>
                {props.item.flavor &&
                  props.item.flavor.map((f, idx) => (
                    <span key={idx}>{f.label}</span>
                  ))}
              </Flavor>
            </DetailCard>
          )}
        </More>
        <ListComment>
          {props.item.comments &&
            props.item.comments.map((c, idx) => <div>{c.text}</div>)}
        </ListComment>
        <Notes>
          <Table
            data={props.item.notes}
            postNote={(note) => postNote(note)}
            deleteNote={(note) => deleteNote(note)}
          />
        </Notes>
        <Comments>
          <div style={{ width: `85%` }}>
            <Input
              name="text"
              placeholder="Comment"
              value={data.text}
              handleChange={handleChange}
            />
          </div>
          <div style={{ width: `10%` }}>
            <Button label="Comment" handleClick={postComment} />
          </div>
        </Comments>
      </Content>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  /* margin: 6em auto; */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1260px;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Header = styled(Flex)``;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  width: 50%;
  position: relative;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 4em;

  h2 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1rem;
  }
`;

const Flavor = styled.div`
  margin-bottom: 1em;

  span {
    font-size: 0.875rem;
    background-color: #eee;
    border-radius: 1em;
    padding: 0.25em 0.75em;
    margin-left: 0.5em;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const More = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2em;
`;

const Comments = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  margin: 1.5em 0;
`;

const Notes = styled.div``;

const ListComment = styled.div``;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { deleteCoffee, addNote, deleteNote })(
  DetailPresenter
);
