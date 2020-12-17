import React, { useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Plus, Coffee } from "../assets/Icons";
import { gray, primary } from "../components/Colors";

export const EmptyCard = ({ label, path }) => {
  return (
    <Link to={path}>
      <EmptyWrapper>
        <Plus width="20" height="20" color="#000" stroke="2" />
        <h6>{label}</h6>
      </EmptyWrapper>
    </Link>
  );
};

export const Card = ({
  imageUrl,
  overline,
  name,
  caption,
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
      <CardWrapper>
        <ImageContainer>
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
          <div className="sub">{overline}</div>
          <div className="title">
            {name.length > 14 ? `${name.substring(0, 14)}...` : name}
          </div>
          {caption && (
            <div className="caption">
              {caption.map((r, idx, arr) =>
                idx === arr.length - 1 ? (
                  <span key={idx}>{r.label}</span>
                ) : (
                  <span key={idx}>
                    <span>{r.label}</span>,{" "}
                  </span>
                )
              )}
            </div>
          )}
        </Details>
      </CardWrapper>
    </Link>
  );
};

export const DetailCard = ({ header, children }) => {
  return (
    <CardWrapper>
      <h6>{header}</h6>
      <Details>{children}</Details>
    </CardWrapper>
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
        <div className="caption">
          <Link to={{ pathname: `${reference}` }} target="_blank">
            instructions
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

const EmptyWrapper = styled(Flex)`
  background-color: rgba(233, 240, 236, 0.6);
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

const CardWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid #f7f1dc;
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
  padding: 0 1em;

  .sub {
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 0.875rem;
    color: ${primary.wintergreen};
  }

  .title {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${primary.orange};
  }

  p {
    font-size: 0.75rem;
  }

  .caption {
    font-size: 0.75rem;
    color: ${gray.darkergray};
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
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 0.875rem;
    color: ${primary.wintergreen};
  }

  .title {
    font-size: 1rem;
    line-height: 1.5em;
    font-weight: 500;
    color: ${primary.orange};
  }

  .caption {
    font-size: 0.75rem;
    line-height: 1.5em;
    color: ${gray.darkergray};
    padding-top: 1em;
  }

  .delete {
    font-size: 0.75rem;
    padding-top: 1em;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;
