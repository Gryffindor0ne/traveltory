import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";

import { useAppDispatch, useAppSelector } from "../hooks";
import { setLoginState, setNaverLoginState } from "../loginSlice";
import { authService } from "@apis/f-base";
import { userState } from "../userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  margin: 50px 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NickName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.9rem;
`;
const Email = styled.div`
  font-size: 0.8rem;
`;

const ProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: 50%;
  background: #ffab91;
  margin: 0.5rem;
  padding: 0.2rem;
`;
const LogOutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  color: #ffffff;
  background: #ffab91;
  margin-top: 3rem;

  :hover {
    transform: scale(1.1);
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, nickname, profile_image } = useAppSelector(userState);

  const onLogOutClick = () => {
    localStorage.clear();
    signOut(authService);
    dispatch(setLoginState(false));
    dispatch(setNaverLoginState(false));

    navigate("/");
  };

  return (
    <Container>
      <ProfileContainer>
        <div>
          <NickName>{nickname}</NickName>
          <Email>{email}</Email>
        </div>
        {profile_image && <ProfileImg src={profile_image} />}
      </ProfileContainer>
      <LogOutBtn onClick={onLogOutClick}>Logout</LogOutBtn>
    </Container>
  );
};

export default Profile;
