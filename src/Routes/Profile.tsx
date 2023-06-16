import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";

import { authService, dbService } from "@apis/f-base";
import ShortStories from "@components/ShortStories";
import { useAppDispatch, useAppSelector } from "@redux/hooks/reduxHooks";
import { setLoginState } from "@redux/slices/loginSlice";
import { userState } from "@redux/slices/userSlice";
import { storyData, StoryInfo, updateStory } from "@redux/slices/storySlice";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import LoginIndicator from "@components/LoadingIndicator";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  margin: 50px 0;
`;

const MyInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 3rem;
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

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff8f00;
  margin: 10rem 0rem;
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

const Profile = ({
  loadingStateControl,
}: {
  loadingStateControl: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { stories } = useAppSelector(storyData);
  const { id, email, nickname, profile_image } = useAppSelector(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoriesByMine, setSelectedStoriesByMine] = useState<
    StoryInfo[] | undefined
  >([]);

  const onLogOutClick = () => {
    localStorage.clear();
    loadingStateControl(false);
    signOut(authService);
    dispatch(setLoginState(false));
    navigate("/");
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "stories"),
      orderBy("writtenAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const storyArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(updateStory(storyArr as StoryInfo[]));
    });
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      setSelectedStoriesByMine(
        stories.filter((el) => el.writerId.includes(id))
      );
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [stories, id]);

  return (
    <Container>
      {isLoading ? (
        <LoginIndicator />
      ) : (
        <MyInfoContainer>
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
            {selectedStoriesByMine?.length !== 0 ? (
              selectedStoriesByMine?.map((story) => (
                <ShortStories story={story} key={story.id} />
              ))
            ) : (
              <Text>작성한 스토리가 없습니다.</Text>
            )}
          </MyStoryContainer>

          <LogOutBtn onClick={onLogOutClick}>로그아웃</LogOutBtn>
        </MyInfoContainer>
      )}
    </Container>
  );
};

export default Profile;
