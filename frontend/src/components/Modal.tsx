import React, { FC } from "react";
import styled from "styled-components";
import Text from "./Text";

interface Props {
  open: boolean;
  header: string;
  children: any;
  handleClose: () => void;
}

const Modal: FC<Props> = ({ open, header, children, handleClose }) => {
  if (!open) return null;

  return (
    <>
      <Overlay onClick={handleClose} />
      <Container>
        <Header>
          <Text variant="h3">{header}</Text>
          <button onClick={handleClose}>close</button>
        </Header>
        <Content>{children}</Content>
      </Container>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const Container = styled.div`
  position: fixed;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 100;
`;

const Header = styled.header`
  position: sticky;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
`;

const Content = styled.main`
  position: fixed;
  width: 100%;
  height: 90%;
  top: 60px;
  padding: 1rem;
  overflow-y: auto;
`;

export default Modal;
