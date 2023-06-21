import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import {
  addCategory,
  removeCategory,
  removeTag,
} from "@redux/slices/storySlice";
import { useAppDispatch } from "@redux/hooks/reduxHooks";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
`;

const NavigationBox = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 0.7rem;
`;

const MenuBar = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 5px;
`;

const Icon = styled.li`
  font-size: 1.3rem;
  margin-left: 2.5rem;
  margin-right: 0.5rem;
`;

function NavBar() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Container>
        <NavigationBox>
          <Link
            to="/"
            onClick={() => {
              dispatch(removeTag());
              dispatch(
                addCategory({
                  name: "total",
                  value: 0,
                })
              );
            }}
          >
            <LogoImg src="/images/logo.png" alt="logo" />
          </Link>

          <MenuBar>
            <Icon>
              <Link
                to="/story/new"
                onClick={() => {
                  dispatch(removeTag());
                  dispatch(removeCategory());
                }}
              >
                <FontAwesomeIcon icon={faPen} color={"#ff8f00"} />
              </Link>
            </Icon>
            <Icon>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} color={"#ff8f00"} />
              </Link>
            </Icon>
          </MenuBar>
        </NavigationBox>
      </Container>
    </>
  );
}

export default NavBar;
