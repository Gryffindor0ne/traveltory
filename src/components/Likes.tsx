import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFill } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { doc, updateDoc } from "firebase/firestore";

import { dbService } from "@apis/f-base";
import { StoryInfo } from "../storySlice";

const LikesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 38%;

  > span {
    cursor: pointer;
    font-size: 1.3rem;
    color: #ffab91;
  }
`;

const Likes = ({
  storyId,
  story,
}: {
  story: StoryInfo | undefined;
  storyId: string | undefined;
}) => {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (story) {
      const currentLike =
        story?.likes.filter((item) => item === storyId).length === 0
          ? false
          : true;
      console.log(currentLike);
      setLike(currentLike);
    }
  }, [story]);

  const handleLikesClick = async () => {
    if (!like) {
      const storyObj = {
        ...story,
        likes: [...(story?.likes as []), storyId],
      };
      try {
        await updateDoc(doc(dbService, "stories", `${story?.id}`), storyObj);
      } catch (error) {
        console.log(error);
      }
    } else {
      const filteredLikes = story?.likes.filter((item) => item !== storyId);
      const storyObj = {
        ...story,
        likes: filteredLikes,
      };
      try {
        await updateDoc(doc(dbService, "stories", `${story?.id}`), storyObj);
      } catch (error) {
        console.log(error);
      }
    }
    // setLike((prev: boolean) => !prev);
  };

  console.log(story);

  return (
    <LikesContainer>
      {like ? (
        <span onClick={handleLikesClick}>
          <FontAwesomeIcon icon={faHeartFill} />
        </span>
      ) : (
        <span onClick={handleLikesClick}>
          <FontAwesomeIcon icon={faHeart} />
        </span>
      )}
    </LikesContainer>
  );
};

export default Likes;
