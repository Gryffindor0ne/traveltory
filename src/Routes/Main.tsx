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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

const HomeBtnBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: #ff8f00;
`;
const HomeBtn = styled.span`
  > svg {
    cursor: pointer;
    font-size: 1.2rem;
    margin: 0 1rem;
  }
`;

const TagNameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const TagName = styled.div`
  font-size: 1.1rem;
  > span {
    font-size: 1.5rem;
    color: #ff8f00;
    margin-right: 0.5rem;
  }
`;

const Main = () => {
  const { stories, tag, category } = useAppSelector(storyData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    if (category.name) {
      if (category.name === "total") {
        setSelectedStoriesByCategory([]);
      } else {
        setSelectedStoriesByCategory(
          stories.filter((el) => el.category.includes(category.name))
        );
        dispatch(removeTag());
      }
    }
  }, [category, dispatch, stories]);

  const homeBtn = () => {
    dispatch(removeTag());
    navigate("/");
  };

  return (
    <Container>
      {tag.length === 0 ? (
        <Category />
      ) : (
        <>
          <HomeBtnBox>
            <HomeBtn onClick={homeBtn}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </HomeBtn>
            전체 글 보기
          </HomeBtnBox>
          <TagNameBox>
            <TagName>
              <span>{tag}</span>태그를 포함한 모든 글
            </TagName>
          </TagNameBox>
        </>
      )}

      {tag.length !== 0
        ? selectedStoriesByTag.map((story) => (
            <ShortStories story={story} key={story.id} />
          ))
        : category.name.length !== 0 && category.name !== "total"
        ? selectedStoriesByCategory.map((story: StoryInfo) => (
            <ShortStories story={story} key={story.id} />
          ))
        : stories.map((story) => <ShortStories story={story} key={story.id} />)}
    </Container>
  );
};

export default Main;
