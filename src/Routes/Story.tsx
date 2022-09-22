import { useAppSelector } from "../hooks";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storyData, StoryInfo } from "../storySlice";
import { koreanDateFormatter } from "@utils/dataUtils";
import { selectList } from "./NewStory";
import Tags from "@components/Tags";

const Story = () => {
  const params = useParams();
  const currentId = params.id;

  const { stories } = useAppSelector(storyData);

  const [currentStory, setCurrentStory] = useState<StoryInfo | undefined>();

  useEffect(() => {
    if (currentId) {
      setCurrentStory(stories.find((el) => el.id === currentId));
    }
  }, [stories, currentId]);

  return (
    <>
      <div>
        <img
          src={currentStory?.writer_profile_image}
          alt={currentStory?.writerNickName}
          width="50px"
          height="50px"
        />
        <div>
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
        </div>
      </div>
      <div>
        <Tags tags={currentStory?.tags} />
      </div>
      {currentStory?.image && (
        <img
          src={currentStory.image}
          alt={currentStory.writerNickName}
          width="150px"
          height="120px"
        />
      )}
      <div>{currentStory?.title}</div>
      <div>{currentStory?.content}</div>
    </>
  );
};

export default Story;
