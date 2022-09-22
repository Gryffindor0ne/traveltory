import { StoryInfo } from "@routes/Main";
import { koreanDateFormatter } from "@utils/dataUtils";
import React from "react";
import { useNavigate } from "react-router-dom";
import { selectList } from "@routes/NewStory";

const ShortStories = ({ story }: { story: StoryInfo }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`/story/${story.id}`);
        }}
      >
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
