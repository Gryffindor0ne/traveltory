import { StoryInfo } from "../storySlice";
import { koreanDateFormatter } from "@utils/dateUtils";
import React from "react";
import { useNavigate } from "react-router-dom";
import { selectList } from "@routes/NewStory";
import Tags from "./Tags";

const ShortStories = ({ story }: { story: StoryInfo }) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <img
          src={story.writer_profile_image}
          alt={story.writerNickName}
          width="50px"
          height="50px"
        />
        <div>
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
        </div>
      </div>
      <div>
        <Tags tags={story.tags} />
      </div>
      <div
        onClick={() => {
          navigate(`/story/${story.id}`);
        }}
      >
        {story.image && (
          <img
            src={story.image}
            alt={story.writerNickName}
            width="150px"
            height="120px"
          />
        )}
        <div>{story.title}</div>
        <div>{story.content}</div>
      </div>
    </>
  );
};

export default ShortStories;
