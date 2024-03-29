import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFill } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { doc, updateDoc } from "firebase/firestore";

import { dbService } from "@apis/f-base";
import { StoryInfo } from "@redux/slices/storySlice";

const LikesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    cursor: pointer;
    font-size: 1.3rem;
    color: #ffab91;
  }
`;

const Likes = ({
  userId,
  story,
}: {
  story: StoryInfo | undefined;
  userId: string | undefined;
}) => {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (story) {
      const currentLike =
        story?.likes.filter((item) => item === userId).length === 0
          ? false
          : true;
      setLike(currentLike);
    }
  }, [story, userId]);

  const handleLikesClick = async () => {
    if (!like) {
      const storyObj = {
        ...story,
        likes: [...(story?.likes as []), userId],
      };
      try {
        await updateDoc(doc(dbService, "stories", `${story?.id}`), storyObj);
      } catch (error) {
        console.log(error);
      }
    } else {
      const filteredLikes = story?.likes.filter((item) => item !== userId);
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
  };

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
