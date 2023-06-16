import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from "styled-components";

import { dbService } from "@apis/f-base";
import ShortStories from "@components/ShortStories";
import Category from "@components/Category";
import { useAppDispatch, useAppSelector } from "@redux/hooks/reduxHooks";
import {
  StoryInfo,
  removeTag,
  removeCategory,
  updateStory,
  storyData,
} from "@redux/slices/storySlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 330px;
  margin-bottom: 3rem;
`;

const Main = () => {
  const { stories, tag, category } = useAppSelector(storyData);

  const dispatch = useAppDispatch();

  const [selectedStoriesByTag, setSelectedStoriesByTag] = useState<StoryInfo[]>(
    []
  );
  const [selectedStoriesByCategory, setSelectedStoriesByCategory] = useState<
    StoryInfo[]
  >([]);

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
    if (tag) {
      dispatch(removeCategory());
      setSelectedStoriesByCategory([]);
      setSelectedStoriesByTag(stories.filter((el) => el.tags.includes(tag)));
    }
  }, [tag, dispatch, stories]);

  useEffect(() => {
    if (category) {
      if (category === "total") {
        setSelectedStoriesByCategory([]);
      } else {
        setSelectedStoriesByCategory(
          stories.filter((el) => el.category.includes(category))
        );
        dispatch(removeTag());
      }
    }
  }, [category, dispatch, stories]);

  return (
    <Container>
      {tag.length === 0 ? <Category /> : <DivContainer></DivContainer>}

      {tag.length !== 0
        ? selectedStoriesByTag.map((story) => (
            <ShortStories story={story} key={story.id} />
          ))
        : category.length !== 0 && category !== "total"
        ? selectedStoriesByCategory.map((story: StoryInfo) => (
            <ShortStories story={story} key={story.id} />
          ))
        : stories.map((story) => <ShortStories story={story} key={story.id} />)}
    </Container>
  );
};

export default Main;
