import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from "styled-components";

import { dbService } from "@apis/f-base";
import ShortStories from "@components/ShortStories";
import { useAppDispatch, useAppSelector } from "../hooks";
import { StoryInfo, storyData, updateStory } from "../storySlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;

  margin: 2rem 0;
`;

const Main = () => {
  const { stories, tag } = useAppSelector(storyData);
  const dispatch = useAppDispatch();

  const [selectedStoriesByTag, setSelectedStoriesByTag] = useState<StoryInfo[]>(
    []
  );

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
  }, []);

  useEffect(() => {
    if (tag) {
      setSelectedStoriesByTag(stories.filter((el) => el.tags.includes(tag)));
    }
  }, [tag, stories]);

  console.log(tag);

  console.log(stories);

  console.log(selectedStoriesByTag);

  return (
    <Container>
      <Title>여행 감성</Title>

      {tag.length !== 0
        ? selectedStoriesByTag.map((story) => (
            <ShortStories story={story} key={story.id} />
          ))
        : stories.map((story) => <ShortStories story={story} key={story.id} />)}
    </Container>
  );
};

export default Main;
