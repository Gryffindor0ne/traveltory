import { dbService } from "@apis/f-base";
import ShortStories from "@components/ShortStories";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type StoryInfo = {
  category: string;
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  writtenAt: string;
  writerId: string;
  writerNickName: string;
  writer_profile_image: string;
};

const Main = () => {
  const navigate = useNavigate();

  const [stories, setStories] = useState<StoryInfo[]>([]);

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

      setStories(storyArr as StoryInfo[]);
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
