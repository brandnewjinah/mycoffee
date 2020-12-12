import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

//import components
import Input from "../../components/Input";

//import styles
import styled from "styled-components";
import { Button } from "../../components/Button";

//토큰에 있는 유저정보와 note의 유저정보를 match 해서 맞으면 note 가 보이게. 아니면 null.

const DetailPresenter = (props) => {
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

  return (
    <Container>
      <Content>
        <Header>
          <ImageContainer>
            <Image
              src={
                props.image
                  ? props.image
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
              }
            />
          </ImageContainer>
          <Data>
            <Subtitle>{props.roaster && props.roaster}</Subtitle>
            <Title>{props.name && props.name}</Title>
            <p>{props.description && props.description}</p>
          </Data>
        </Header>
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
        <ListComment>
          {console.log(`++`, props)}
          {props.comments &&
            props.comments.map((c, idx) => <div>{c.text}</div>)}
        </ListComment>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  /* margin: 6em auto; */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Content = styled.div`
  margin: 6em auto;
  width: 100%;
  max-width: 1260px;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  width: 45%;
  position: relative;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 4em;
`;

const Title = styled.h3`
  font-size: 2rem;
`;

const Subtitle = styled.h4`
  font-size: 1rem;
`;

const Comments = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  margin: 1.5em 0;
`;

const ListComment = styled.div``;

export default DetailPresenter;
