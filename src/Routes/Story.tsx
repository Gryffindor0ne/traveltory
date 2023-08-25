import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import {
  doc,
  deleteDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import styled from "styled-components";

import { selectList } from "./NewStory";
import { koreanDateFormatter } from "@utils/dateUtils";
import Tags from "@components/layout/Tags";
import EditStory from "@components/EditStory";
import { dbService, storage } from "@apis/f-base";
import { storyData, StoryInfo, updateStory } from "@redux/slices/storySlice";
import { userState } from "@redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks/reduxHooks";
import Likes from "@components/layout/Likes";
import LoginIndicator from "@components/layout/LoadingIndicator";
import { defaultImageURL } from "@components/layout/ImageUploadForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 7rem;
  padding: 1rem 2rem;
`;

const PreviousBtnBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #ff8f00;
`;
const PreviousBtn = styled.span`
  > svg {
    cursor: pointer;
    font-size: 1.2rem;
    margin: 0 1rem;
  }
`;

const StoryInfoContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const WriterProfileImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 50%;
  background: #ffab91;
  margin: 0.5rem;
  padding: 0.2rem;
`;

const StoryInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-left: 0.3rem;

  > div {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
  > span {
    font-size: 0.8rem;
    color: #6d819c;
    > span {
      margin-right: 1.2rem;
    }
  }
`;

const StoryContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 0.5rem;
`;

const StoryImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 0.7rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.5em;
  margin: 1rem 0;
`;

const Content = styled.div`
  line-height: 1.5rem;
  font-size: 0.9rem;
  color: #444f59;
  width: 100%;
  white-space: pre-wrap;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  padding: 0.5rem;
`;

const EditBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #f6b352;
  border-radius: 10px;
  color: #ff8f00;
  font-weight: bold;
  font-size: 0.9rem;
  width: 7rem;
  height: 2rem;
  margin: 0 0.5rem;
  padding: 1rem 0.3rem;

  :hover {
    border: none;
    background: #ff8f00;
    color: white;
    font-weight: bold;
  }
`;

const CancelBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #f6b352;
  border-radius: 10px;
  color: #ff8f00;
  font-weight: bold;
  font-size: 0.9rem;
  width: 7rem;
  height: 2rem;
  margin: 0 0.5rem;
  padding: 1rem 0.3rem;

  :hover {
    border: none;
    background: #ff8f00;
    color: white;
    font-weight: bold;
  }
`;

const Story = () => {
  const params = useParams();
  const currentId = params.id;
  const navigate = useNavigate();
  const { stories } = useAppSelector(storyData);
  const { id } = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [currentStory, setCurrentStory] = useState<StoryInfo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

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
    if (currentId) {
      setCurrentStory(stories.find((el) => el.id === currentId));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [stories, currentId]);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 이 스토리 삭제를 원합니까?");
    navigate("/");
    if (ok) {
      await deleteDoc(doc(dbService, "stories", `${currentStory?.id}`));
      if (currentStory?.image && currentStory?.image !== defaultImageURL) {
        const urlRef = ref(storage, currentStory?.image);
        await deleteObject(urlRef);
      }
    }
  };

  const toggleEdit = () => setIsEdit((prev) => !prev);

  return (
    <>
      {isEdit ? (
        <EditStory story={currentStory} setIsEdit={setIsEdit} />
      ) : isLoading ? (
        <LoginIndicator />
      ) : (
        <StoryContainer>
          <PreviousBtnBox>
            <PreviousBtn onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </PreviousBtn>
            뒤로 가기
          </PreviousBtnBox>
          <StoryInfoContainer>
            <WriterProfileImg
              src={currentStory?.writer_profile_image}
              alt={currentStory?.writerNickName}
            />
            <StoryContentBox>
              <StoryInfoBox>
                <div>{currentStory?.writerNickName}</div>
                <span>
                  <span>
                    {
                      selectList.find(
                        (option) => currentStory?.category === option.value
                      )?.name
                    }
                  </span>
                  <span>{koreanDateFormatter(currentStory?.writtenAt)}</span>
                </span>
              </StoryInfoBox>
              <Likes userId={id} story={currentStory} />
            </StoryContentBox>
          </StoryInfoContainer>

          <TagContainer>
            <Tags tags={currentStory?.tags} />
          </TagContainer>
          {currentStory?.image && (
            <StoryImg
              src={currentStory.image}
              alt={currentStory.writerNickName}
            />
          )}
          <Title>{currentStory?.title}</Title>
          <Content>
            {currentStory?.content.split(`/n`).map((text, idx) => {
              return (
                <span key={idx}>
                  {text}
                  <br />
                </span>
              );
            })}
          </Content>

          {currentStory?.writerId === id && (
            <BtnContainer>
              <EditBtn onClick={toggleEdit}>스토리 편집</EditBtn>
              <CancelBtn onClick={onDeleteClick}>스토리 삭제</CancelBtn>
            </BtnContainer>
          )}
        </StoryContainer>
      )}
    </>
  );
};

export default Story;
