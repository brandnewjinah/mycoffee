import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//comp
import { Logo } from "../../assets/Icons";
import { gray } from "../Colors";
import { breakpoint, fontSize, size } from "../token";

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
            <Logo width={32} height={29} color="#000"></Logo>
          </Link>
        </Left>
        <Center open={open}>
          <List>
            <Item>
              <NavLink to="/brew" onClick={() => setOpen(false)}>
                Brew
              </NavLink>
            </Item>
            <Item>
              <NavLink to="/collection" onClick={() => setOpen(false)}>
                Collection
              </NavLink>
            </Item>
            <Item>
              <NavLink to="/recipe" onClick={() => setOpen(false)}>
                Recipe
              </NavLink>
            </Item>
            <Item>
              <NavLink to="/tools" onClick={() => setOpen(false)}>
                Tools
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
            <button
              type="button"
              role="switch"
              aria-pressed={open}
              onClick={() => setOpen(!open)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              role="switch"
              aria-pressed={open}
              onClick={() => setOpen(!open)}
            >
              Menu
            </button>
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
  height: 4rem;
  background-color: #fff;
`;

const Nav = styled.nav`
  ${Flex};
  justify-content: space-between;
  width: 100%;
  max-width: ${size.xlg};
  font-size: ${fontSize.sm2};
  padding: 0 1rem;
  margin: 0 auto;
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

  @media ${breakpoint.lg} {
    position: absolute;
    top: 4rem;
    left: 0;
    right: 0;
    background-color: #fff;
    height: calc(100vh - 4rem);
    flex-direction: column;
    justify-content: flex-start;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
    z-index: 100;
  }
`;

const List = styled.ul`
  ${Flex}
  justify-content: space-between;
  list-style-type: none;
  z-index: 2;

  @media ${breakpoint.lg} {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
  }
`;

const Item = styled.li`
  margin: 0 0.75rem;
  text-align: center;
  transition: border-bottom 0.5s ease-in-out;

  @media ${breakpoint.lg} {
    margin: 1rem 0.75rem;
  }
`;

const MobileLink = styled.ul`
  display: none;
  list-style-type: none;

  @media ${breakpoint.lg} {
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

  @media ${breakpoint.lg} {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  button {
    border: none;
    background-color: transparent;
    padding: 1rem 0;
    cursor: pointer;
  }

  @media ${breakpoint.lg} {
    display: block;
  }
`;

export default Header;
