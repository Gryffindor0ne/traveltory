import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { selectList } from "@routes/NewStory";
import { StoryInfo } from "../storySlice";
import { koreanDateFormatter } from "@utils/dateUtils";
import Tags from "./Tags";

const StoryInfoContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
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
  height: 160px;
  border-radius: 5px;
  margin-bottom: 0.7rem;
`;

const StoryBox = styled.div`
  cursor: pointer;
  margin: 1rem 0;
`;

const Title = styled.h3`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  font-size: 0.9rem;
  color: #9e9e9e;
  width: calc(340px - 1rem);
  overflow: hidden;
  position: relative;
  line-height: 1.2rem;
  max-height: 2.4rem;
  margin-right: -1rem;
  padding-right: 1rem;
  :before {
    content: "...";
    position: absolute;
    right: 0;
    bottom: 0;
  }
  :after {
    content: "";
    position: absolute;
    right: 0;
    width: 1rem;
    height: 1rem;
    margin-top: 0.2rem;
    background: white;
  }
  margin-bottom: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
`;

const ShortStories = ({ story }: { story: StoryInfo }) => {
  const navigate = useNavigate();
  return (
    <>
      <StoryInfoContainer>
        <WriterProfileImg
          src={story.writer_profile_image}
          alt={story.writerNickName}
        />
        <StoryInfoBox>
          <div>{story.writerNickName}</div>
          <span>
            <span>
              {
                selectList.find((option) => story.category === option.value)
                  ?.name
              }
            </span>
            <span>{koreanDateFormatter(story.writtenAt)}</span>
          </span>
        </StoryInfoBox>
      </StoryInfoContainer>

      <TagContainer>
        <Tags tags={story.tags} />
      </TagContainer>

      <StoryBox
        onClick={() => {
          navigate(`/story/${story.id}`);
        }}
      >
        {story.image && (
          <StoryImg
            src={story.image}
            alt={story.writerNickName}
            width="150px"
            height="120px"
          />
        )}
        <Title>{story.title}</Title>
        <Content>{story.content}</Content>
      </StoryBox>
    </>
  );
};

export default ShortStories;
