import { dbService } from "@apis/f-base";
import ShortStories from "@components/ShortStories";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryInfo, storyData, updateStory } from "../storySlice";

const Main = () => {
  const navigate = useNavigate();
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
    <div>
      <div>내 여행 기록</div>
      <div onClick={() => navigate("/story/new")}>글쓰기</div>
      {tag.length !== 0
        ? selectedStoriesByTag.map((story) => (
            <ShortStories story={story} key={story.id} />
          ))
        : stories.map((story) => <ShortStories story={story} key={story.id} />)}
    </div>
  );
};

export default Main;
