import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";

import { authService } from "@apis/f-base";
import ShortStories from "@components/ShortStories";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setLoginState, setNaverLoginState } from "../loginSlice";
import { userState } from "../userSlice";
import { storyData, StoryInfo } from "../storySlice";

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
  margin-bottom: 3rem;
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
  background: #ff8f00;
  margin: 0.5rem;
  padding: 0.2rem;
`;
const MyStoryContainer = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ff8f00;
  margin-bottom: 0.5rem;
`;

const Line = styled.div`
  border: 1px solid #ffab91;
  margin-bottom: 1.5rem;
`;

const LogOutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ffab91;
  border-radius: 10px;
  color: #ff8f00;
  font-weight: bold;
  font-size: 1.1rem;
  width: 7rem;
  height: 2.5rem;
  margin-top: 3rem;

  :hover {
    border: none;
    background: #ff8f00;
    color: white;
    font-weight: bold;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { stories } = useAppSelector(storyData);
  const { id, email, nickname, profile_image } = useAppSelector(userState);
  const [selectedStoriesByMine, setSelectedStoriesByMine] = useState<
    StoryInfo[]
  >([]);

  const onLogOutClick = () => {
    localStorage.clear();
    signOut(authService);
    dispatch(setLoginState(false));
    dispatch(setNaverLoginState(false));
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      setSelectedStoriesByMine(
        stories.filter((el) => el.writerId.includes(id))
      );
    }
  }, [stories]);

  return (
    <Container>
      <ProfileContainer>
        <div>
          <NickName>{nickname}</NickName>
          <Email>{email}</Email>
        </div>
        {profile_image && <ProfileImg src={profile_image} />}
      </ProfileContainer>
      <MyStoryContainer>
        <Title>내가 작성한 스토리</Title>
        <Line></Line>
        {selectedStoriesByMine.length === 0 ? (
          <div>작성한 스토리가 없습니다.</div>
        ) : (
          selectedStoriesByMine.map((story) => (
            <ShortStories story={story} key={story.id} />
          ))
        )}
      </MyStoryContainer>

      <LogOutBtn onClick={onLogOutClick}>Logout</LogOutBtn>
    </Container>
  );
};

export default Profile;
