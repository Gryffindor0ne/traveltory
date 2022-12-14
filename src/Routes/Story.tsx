import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

import { selectList } from "./NewStory";
import { koreanDateFormatter } from "@utils/dateUtils";
import Tags from "@components/Tags";
import EditStory from "@components/EditStory";
import { dbService, storage } from "@apis/f-base";
import { storyData, StoryInfo } from "../storySlice";
import { userState } from "../userSlice";
import { useAppSelector } from "../hooks";
import Likes from "@components/Likes";

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  margin: 2rem;
`;

const StoryInfoContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const EditBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 2rem;
  > span {
    font-size: 1.4rem;
    color: #90a4ae;
    margin: 0 0.7rem;
  }
`;

const WriterProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: #ffab91;
  margin: 0.5rem 0.5rem 0.5rem 0rem;
  padding: 0.2rem;
`;

const StoryInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
  > div {
    font-weight: bold;
    font-size: 0.9rem;

    margin-bottom: 0.6rem;
  }
  > span {
    font-size: 0.8rem;
    color: #90a4ae;
    > span {
      margin-right: 1rem;
    }
  }
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
  line-height: 1.3rem;
  font-size: 0.8rem;
  color: #9e9e9e;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Story = () => {
  const params = useParams();
  const currentId = params.id;
  const navigate = useNavigate();
  const { stories } = useAppSelector(storyData);
  const { id } = useAppSelector(userState);

  const [isEdit, setIsEdit] = useState(false);
  const [currentStory, setCurrentStory] = useState<StoryInfo | undefined>();

  useEffect(() => {
    if (currentId) {
      setCurrentStory(stories.find((el) => el.id === currentId));
    }
  }, [stories, currentId]);

  const onDeleteClick = async () => {
    const ok = window.confirm("????????? ??? ????????? ????????? ?????????????");
    if (ok) {
      await deleteDoc(doc(dbService, "stories", `${currentStory?.id}`));
      if (currentStory?.image) {
        const urlRef = ref(storage, currentStory?.image);
        await deleteObject(urlRef);
      }
      navigate("/");
    }
  };

  const toggleEdit = () => setIsEdit((prev) => !prev);

  return (
    <>
      {isEdit ? (
        <EditStory story={currentStory} setIsEdit={setIsEdit} />
      ) : (
        <StoryContainer>
          <StoryInfoContainer>
            <WriterProfileImg
              src={currentStory?.writer_profile_image}
              alt={currentStory?.writerNickName}
            />
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
          <Content>{currentStory?.content}</Content>
          {currentStory?.writerId === id && (
            <EditBtn>
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faFilePen} />
              </span>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </EditBtn>
          )}
        </StoryContainer>
      )}
    </>
  );
};

export default Story;
