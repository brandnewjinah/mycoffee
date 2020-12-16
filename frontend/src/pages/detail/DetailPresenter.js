import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

//import components
import { Input } from "../../components/Input";
import { BtnText } from "../../components/Button";
import Table from "../../components/Table";

//import redux
import { connect } from "react-redux";
import {
  deleteCoffee,
  addNote,
  deleteNote,
} from "../../reducers/collectionReducer";

//import styles
import styled from "styled-components";

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
          <h2>{props.item.name && props.item.name}</h2>
          <p>{props.item.description && props.item.description}</p>
          <div>
            {props.item.origin && (
              <Block>
                <div className="header">ORIGIN</div>
                <div className="body">{props.item.origin}</div>
              </Block>
            )}

            {props.item.roast && (
              <Block>
                <div className="header">ROAST LEVEL</div>
                <div className="body">
                  {props.item.roast.map((r, idx, arr) =>
                    idx === arr.length - 1 ? (
                      <span key={idx}>{r.label}</span>
                    ) : (
                      <>
                        <span key={idx}>{r.label}</span>,{" "}
                      </>
                    )
                  )}
                </div>
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
        </Data>
      </Header>
      <Notes>
        <h6>BREW NOTES</h6>
        <Table
          data={props.item.notes}
          postNote={(note) => postNote(note)}
          deleteNote={(note) => deleteNote(note)}
        />
      </Notes>
      <ListComment>
        <h6>COMMENTS</h6>
        {props.item.comments &&
          props.item.comments.map((c, idx) => <div>{c.text}</div>)}
      </ListComment>
      <Comments>
        <div style={{ width: `90%` }}>
          <Input
            name="text"
            placeholder="Comment"
            value={data.text}
            handleChange={handleChange}
          />
        </div>
        <div style={{ width: `10%`, textAlign: `right` }}>
          <BtnText label="Comment" handleClick={postComment} />
        </div>
      </Comments>
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

const Header = styled(Flex)``;

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
  margin-left: 2em;

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

  .header {
    font-size: 0.75rem;
    font-weight: 600;
  }

  .body {
    font-size: 0.875rem;
    line-height: 0.875rem;
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

const Notes = styled.div`
  margin: 2em 0;

  h6 {
    font-weight: 500;
    margin-bottom: 1em;
  }
`;

const ListComment = styled.div`
  h6 {
    font-weight: 500;
    margin-bottom: 1em;
  }
`;

const Comments = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  margin: 1.5em 0;
`;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { deleteCoffee, addNote, deleteNote })(
  DetailPresenter
);
