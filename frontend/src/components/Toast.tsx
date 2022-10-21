import React, { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import { primaryColor } from "./token";

export interface Props {
  message?: string;
  btnLabel?: string;
  linkUrl?: string;
  handleCloseBtn?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Toast: FC<Props> = ({ message, btnLabel, linkUrl, handleCloseBtn }) => {
  return (
    <ToastContainer>
      <CloseBtn onClick={handleCloseBtn}>x</CloseBtn>
      <Body variant="body_small">{message}</Body>
      {btnLabel && <Link to={`${linkUrl}`}>{btnLabel}</Link>}
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  position: relative;
  position: fixed;
  bottom: 1rem;
  width: 90%;
  background-color: ${primaryColor.lightGold};
  box-shadow: 0 0 10px #999;
  padding: 1rem;
  z-index: 100;
  animation: toast-slide 0.2s;

  @keyframes toast-slide {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translate(0);
    }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background-color: transparent;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
`;

export default Toast;
