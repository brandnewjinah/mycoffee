import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//comp
import { Coffee } from "../../assets/Icons";
import { gray } from "../Colors";

export interface Props {}

type Style = {
  open?: boolean;
};

const Header: FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Nav>
        <Left>
          <Link to="/">
            <Coffee width="24" height="24" color={gray.darkergray} stroke="2" />
          </Link>
        </Left>
        <Center open={open}>
          <List>
            <Item>
              <NavLink to="/collection" onClick={() => setOpen(false)}>
                My Collection
              </NavLink>
            </Item>
            <Item>
              <NavLink to="/tools" onClick={() => setOpen(false)}>
                My Tools
              </NavLink>
            </Item>
            <Item>
              <NavLink to="/recipes" onClick={() => setOpen(false)}>
                My Recipes
              </NavLink>
            </Item>
          </List>
          <MobileLink>
            <Item>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
            </Item>
          </MobileLink>
        </Center>
        <Right>
          <NavLink to="/login">Login</NavLink>
        </Right>

        <Mobile>
          {open ? (
            <div onClick={() => setOpen(!open)}>Close</div>
          ) : (
            <div onClick={() => setOpen(!open)}>Menu</div>
          )}
        </Mobile>
      </Nav>
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.header`
  ${Flex}
  width: 100%;
  height: 4em;
  background-color: #fff;
`;

const Nav = styled.nav`
  ${Flex};
  justify-content: space-between;
  width: 100%;
  max-width: 1360px;
  font-size: 0.875rem;
  padding: 0 2rem;
`;

const Left = styled.div`
  width: 100%;
  flex: 0 1 auto;
  justify-content: flex-start;
`;

const Center = styled.nav<Style>`
  ${Flex}
  justify-content: center;
  width: 100%;

  @media (max-width: 980px) {
    position: absolute;
    top: 4rem;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
  }
`;

const List = styled.ul`
  ${Flex}
  justify-content: space-between;
  list-style-type: none;
  z-index: 2;

  @media (max-width: 980px) {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
  }
`;

const Item = styled.li`
  margin: 0 0.75rem;
  text-align: center;
  transition: border-bottom 0.5s ease-in-out;

  @media (max-width: 980px) {
    margin: 1rem 0.75rem;
  }
`;

const MobileLink = styled.ul`
  display: none;
  list-style-type: none;

  @media (max-width: 980px) {
    display: block;
    ${Flex}
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.nav`
  ${Flex}
  width: 100%;
  flex: 0 1 auto;
  justify-content: flex-end;

  @media (max-width: 980px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 980px) {
    display: block;
  }
`;

export default Header;
