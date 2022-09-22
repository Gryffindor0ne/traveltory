import { dbService } from "@apis/f-base";
import ShortStories from "@components/ShortStories";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoryInfo, storyData, updateStory } from "../storySlice";

const Main = () => {
  const navigate = useNavigate();
  const { stories } = useAppSelector(storyData);
  const dispatch = useAppDispatch();

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

  console.log(stories);

  return (
    <div>
      <div>내 여행 기록</div>
      <div onClick={() => navigate("/story/new")}>글쓰기</div>
      {stories &&
        stories.map((story) => <ShortStories story={story} key={story.id} />)}
    </div>
  );
};

export default Main;
