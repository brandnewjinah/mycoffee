import React, { useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Plus, Coffee } from "../assets/Icons";

export const EmptyCard = ({ label, path }) => {
  return (
    <Link to={path}>
      <Wrapper>
        <Plus width="20" height="20" color="#000" stroke="2" />
        <h6>{label}</h6>
      </Wrapper>
    </Link>
  );
};

export const Card = ({
  imageUrl,
  roaster,
  name,
  roast,
  toDetail,
  id,
  toRecipe,
}) => {
  const [imgErr, setImgErr] = useState(false);

  const handleDefaultImg = (e) => {
    if (e.type === "error") {
      setImgErr(true);
    }
  };

  return (
    <Link to={toDetail ? `/products/${id}` : toRecipe ? `/recipe/${id}` : null}>
      <Wrapper2>
        <ImageContainer>
          {/* <Image
            onError={handleDefaultImg}
            src={
              imageUrl
                ? imageUrl
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
            }
          /> */}
          {imgErr ? (
            <ErrImg>
              <Coffee width="20" height="20" color="#8F8F8F" stroke="2" />
            </ErrImg>
          ) : (
            <Image
              onError={handleDefaultImg}
              src={imageUrl ? imageUrl : setImgErr(true)}
            />
          )}
        </ImageContainer>
        <Details>
          <div className="sub">{roaster}</div>
          <div className="title">{name}</div>
          {roast && (
            <div>
              {roast.map((r, idx, arr) =>
                idx === arr.length - 1 ? (
                  <span key={idx}>{r.label}</span>
                ) : (
                  <>
                    <span key={idx}>{r.label}</span>,{" "}
                  </>
                )
              )}
            </div>
          )}
        </Details>
      </Wrapper2>
    </Link>
  );
};

export const DetailCard = ({ header, children }) => {
  return (
    <Wrapper2>
      <h6>{header}</h6>
      <Details>{children}</Details>
    </Wrapper2>
  );
};

export const ToolCard = ({
  imageUrl,
  title,
  sub,
  toDetail,
  id,
  reference,
  handleDelete,
}) => {
  const [imgErr, setImgErr] = useState(false);

  const handleDefaultImg = (e) => {
    if (e.type === "error") {
      setImgErr(true);
    }
  };

  return (
    <Tool>
      <ImageContainer>
        {imgErr ? (
          <ErrImg>
            <Coffee width="20" height="20" color="#8F8F8F" stroke="2" />
          </ErrImg>
        ) : (
          <ToolImage
            onError={handleDefaultImg}
            src={imageUrl ? imageUrl : setImgErr(true)}
          />
        )}
      </ImageContainer>
      <Text>
        <div className="sub">{sub}</div>
        <div className="title">{title}</div>
        <div className="sub">
          <Link to={{ pathname: `${reference}` }} target="_blank">
            more
          </Link>
        </div>
        <div className="delete" onClick={handleDelete}>
          Delete
        </div>
      </Text>
    </Tool>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Flex)`
  background-color: seashell;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  margin-bottom: 1.5em;
  padding: 2em;

  h6 {
    margin-top: 1em;
  }
`;

const Wrapper2 = styled(Flex)`
  width: 100%;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid whitesmoke;
  padding-bottom: 1em;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  height: 170px;
  object-fit: cover;
  transition: opacity 0.1s linear;
  /* box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1); */
`;

const ToolImage = styled.img`
  width: 100%;
  height: auto;
  height: 170px;
  object-fit: contain;
  transition: opacity 0.1s linear;
  /* box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1); */
`;

const ErrImg = styled(Flex)`
  justify-content: center;
  min-height: 169px;
`;

const ImageContainer = styled.div`
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
`;

const Details = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  .sub {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 0.875rem;
  }

  .title {
    font-size: 1rem;
  }

  p {
    font-size: 0.75rem;
  }

  span {
    font-size: 0.75rem;
  }
`;

const Tool = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.div`
  .sub {
    font-size: 0.75rem;
  }

  .title {
    font-size: 1rem;
    line-height: 1.5em;
  }

  .delete {
    font-size: 0.75rem;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;
