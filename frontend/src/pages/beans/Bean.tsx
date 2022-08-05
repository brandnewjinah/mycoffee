import React, { FC, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

//comp
import { Container } from "../../components/container/Container";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";
import { List } from "../../components/List";
import { Button, LinkButton } from "../../components/Buttons";
import { Coffee } from "../../assets/Icons";
import { neutral, primaryColor, ratio } from "../../components/token";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteBean } from "../../redux/collectionRedux";
import { getBeanDetails } from "../../redux/beanRedux";

export interface Props {
  ratio?: string;
}

const BeanPage: FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { beanId } = useParams<{ beanId: string }>();

  //get this bean data
  useEffect(() => {
    dispatch(getBeanDetails(beanId));
  }, [dispatch, beanId]);

  const { beanDetails } = useSelector((state: RootState) => state.beans);

  const handleDeleteBean = () => {
    if (window.confirm("Delete this bean?")) {
      dispatch(deleteBean(beanId));
      //for future api, when success deleting, then move to next page
      history.push("/brew");
    }
  };

  return (
    <Container gap="1.5rem">
      <Header title={beanDetails.name} overlay={beanDetails.roaster} />
      <Section>
        {beanDetails.img && beanDetails.img ? (
          <Preview ratio={ratio.portrait_23}>
            <img src={beanDetails.img} alt="" />
          </Preview>
        ) : (
          <Preview ratio={ratio.landscape_169}>
            <Coffee width="24" height="24" color="#000" stroke="1" />
          </Preview>
        )}
        {/* <Preview ratio={ratio.landscape_169}>
          <Coffee width="24" height="24" color="#000" stroke="1" />
        </Preview> */}
      </Section>
      {/*  <LinkButton
        label="Delete"
        variant="tertiary"
        color={primaryColor.blue}
        handleClick={handleDeleteBean}
      /> */}
    </Container>
  );
};

const Preview = styled.div<Props>`
  position: relative;
  display: block;
  max-width: 100%;
  border: 1px solid ${neutral[100]};
  margin-bottom: 0.75rem;

  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }

  img {
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default BeanPage;
