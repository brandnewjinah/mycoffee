import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

//import components
import { Input } from "../../components/Input";
import { BtnText, BtnClose } from "../../components/Button";
import Table from "../../components/Table";

//import redux
import { connect } from "react-redux";
import {
  deleteCoffee,
  addNote,
  deleteNote,
  addComment,
  deleteComment,
} from "../../reducers/collectionReducer";

//import styles
import styled from "styled-components";
import { primary, gray, yellow } from "../../components/Colors";

//토큰에 있는 유저정보와 note의 유저정보를 match 해서 맞으면 note 가 보이게. 아니면 null.

const DetailPresenter = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
    comment: "",
    time: moment().format("MMMM DD, YYYY"),
  });

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const postComment = async () => {
    let id = props.item.comments.length + 1;
    const thisComment = {
      time: data.time,
      comment: data.comment,
      coffeeId: props.item.id,
      id: id,
    };
    props.addComment(thisComment);
    history.go(0);

    // const token = localStorage.getItem("token");
    // const id = props.id;
    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // await axios
    //   .post(`http://localhost:5000/product/comment/${id}`, data, options)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       window.location = "/home";
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

  const deleteComment = (comment) => {
    props.deleteComment(comment);
    history.go(0);
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
          <h6>{props.item.roaster && props.item.roaster}</h6>
          <h2>{props.item.name && props.item.name}</h2>
          <p>{props.item.description && props.item.description}</p>
          <div className="more">
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
                      <span key={idx}>
                        <span key={idx}>{r.label}</span>,{" "}
                      </span>
                    )
                  )}
                </div>
              </Block>
            )}

            {props.item.flavor && (
              <Block>
                <div className="header">FLAVOR</div>
                <div className="body">
                  {props.item.flavor.map((f, idx) => (
                    <Flavor key={idx}>{f.label}</Flavor>
                  ))}
                </div>
              </Block>
            )}
          </div>

          <div className="edit">
            <Link to={`/edit/${props.item.id}`}>edit</Link>
          </div>
        </Data>
      </Header>
      <Bottom>
        <Section>
          <h5>Brew Notes</h5>
          <Table
            data={props.item.notes}
            postNote={(note) => postNote(note)}
            deleteNote={(note) => deleteNote(note)}
          />
        </Section>
        <Section>
          <h5>Comments</h5>
          {props.item.comments &&
            props.item.comments.map((c, idx) => (
              <div className="item" key={idx}>
                <div className="commentItem">
                  <div className="time">{c.time}</div>
                  <div className="comment">{c.comment}</div>
                </div>
                <div className="btnItem">
                  <BtnClose handleClick={() => deleteComment(c)} />
                </div>
              </div>
            ))}
        </Section>
        <PostComments>
          <div className="input">
            <Input
              name="comment"
              placeholder="Comment"
              value={data.comment}
              handleChange={handleChange}
            />
          </div>
          <div className="btnContainer">
            <BtnText label="Comment" handleClick={postComment} />
          </div>
        </PostComments>
      </Bottom>
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
  color: ${gray.darkergray};

  h6 {
    font-weight: 500;
    margin-bottom: 1em;
  }

  @media (max-width: 980px) {
    h6 {
      text-align: center;
    }
  }
`;

const Header = styled(Flex)`
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const Bottom = styled.div``;

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
  margin-left: 2em;

  h2 {
    font-size: 2rem;
    line-height: 2rem;
    color: ${primary.wintergreen};
  }

  h6 {
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.025rem;
    line-height: 1rem;
  }

  p {
    line-height: 1.5rem;
    margin: 0.75em 0;
  }

  .more {
    margin: 2em 0 1em;
  }

  .edit {
    font-size: 0.75rem;
    text-decoration: underline;
    color: #a8a8a8;
  }

  @media (max-width: 980px) {
    width: 100%;
    text-align: center;
    margin-left: 0;
    margin-top: 2em;
  }
`;

const Block = styled.div`
  margin-bottom: 1em;

  .header {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    color: ${primary.orange};
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
  background-color: ${yellow.dark};
  border-radius: 1em;
  padding: 0.25em 0.75em;
  margin-left: 0.5em;
  margin-top: 0.125em;

  &:first-child {
    margin-left: 0;
  }
`;

const Section = styled.div`
  margin: 2em 0;

  h5 {
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 1.5em;
  }

  .item {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  .commentItem {
    display: flex;
    width: 90%;
  }

  .time {
    width: 20%;
    font-size: 0.75rem;
  }

  .comment {
    width: 80%;
  }

  .btnItem {
    width: 2%;
  }

  @media (max-width: 980px) {
    margin-top: 4em;

    .item {
      align-items: center;
    }

    .commentItem {
      flex-direction: column;
    }

    .time {
      width: 100%;
    }

    .comment {
      width: 100%;
    }
  }
`;

const PostComments = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  margin: 1.5em 0;

  .input {
    width: 90%;
  }

  .btnContainer {
    width: 10%;
    text-align: right;
  }

  @media (max-width: 980px) {
    flex-direction: column;

    .input {
      width: 100%;
    }
  }
`;

DetailPresenter.propTypes = {
  deleteCoffee: PropTypes.func,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
  item: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, {
  deleteCoffee,
  addNote,
  deleteNote,
  addComment,
  deleteComment,
})(DetailPresenter);
