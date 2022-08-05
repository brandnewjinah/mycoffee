import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Logo } from "../../assets/Icons";
import { primaryColor } from "../token";

export interface Props {}

type Style = {
  open?: boolean;
};

const Header: FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <HeaderWrapper>
      <LogoContainer>
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo width={32} height={32} color={primaryColor.brickRed}></Logo>
        </Link>
      </LogoContainer>
      <MenuBtn open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
      </MenuBtn>
      <Nav open={open}>
        <ul>
          <li>
            <Link to="/notes" onClick={() => setOpen(false)}>
              Notes
            </Link>
          </li>
          <li>
            <Link to="/beans" onClick={() => setOpen(false)}>
              Beans
            </Link>
          </li>
          <li>
            <Link to="/recipes" onClick={() => setOpen(false)}>
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1.3125rem;
`;

const LogoContainer = styled.div`
  line-height: 0;

  a {
    display: inline-block;
    line-height: 0;
  }
`;

const MenuBtn = styled.button<Style>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 32px;
  width: 32px;
  background-color: transparent;
  outline: transparent;
  border: transparent;
  transform-origin: center;
  cursor: pointer;

  div {
    width: 20px;
    height: 1px;
    background-color: #000;
    transition: all 0.4s ease;
    z-index: 1;

    &:first-child {
      opacity: 1;
      transform: ${({ open }) =>
        open ? "rotate(45deg)" : "rotate(0) translateY(-4px)"};
    }

    &:last-child {
      opacity: 1;
      transform: ${({ open }) =>
        open ? "rotate(-45deg)" : "rotate(0) translateY(4px)"};
    }
  }
`;

const Nav = styled.nav<Style>`
  width: 100%;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  height: calc(100vh - 60px);
  background-color: ${primaryColor.ivory};
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
  z-index: 100;

  li {
    text-align: center;
    margin: 1rem 0.75rem;
  }
`;

export default Header;
