import { dbService } from "@apis/f-base";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import ImageUploadForm from "@components/ImageUploadForm";
import { useAppSelector } from "../hooks";
import { userState } from "../userSlice";

type StoryInfo = {
  category: string;
  title: string;
  content: string;
  tags: string[];
};

export const selectList = [
  { value: "domestic", name: "국내여행" },
  { value: "overseas", name: "해외여행" },
  { value: "day", name: "당일치기" },
  { value: "single", name: "홀로가기" },
  { value: "together", name: "함께가기" },
  { value: "tip", name: "여행노하우" },
];

const NewStory = () => {
  const [story, setStory] = useState<StoryInfo>({
    category: "",
    title: "",
    content: "",
    tags: [],
  });
  const [image, setImage] = useState<string>("");
  const { id, nickname, profile_image } = useAppSelector(userState);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target as HTMLButtonElement;

    setStory({ ...story, [name]: value });
  };
  console.log(story);

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLButtonElement;

    const filtered = story.tags.filter((el) => el === value);

    if (value !== "" && filtered.length === 0) {
      setStory({
        ...story,
        tags: [...story.tags, value],
      });
    }
    event.currentTarget.value = "";
  };

  const removeTag = (clickedIndex: number) => {
    setStory(() => {
      return {
        ...story,
        tags: story.tags.filter((_, index) => {
          return index !== clickedIndex;
        }),
      };
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target as HTMLSelectElement;
    setStory({ ...story, [name]: value });
  };

  const onSubmit = async () => {
    const storyObj = {
      ...story,
      writtenAt: Date.now(),
      writerId: id,
      writerNickName: nickname,
      writer_profile_image: profile_image,
      image,
    };
    try {
      await addDoc(collection(dbService, "stories"), storyObj);
    } catch (error) {
      console.log(error);
    }
    setStory({ category: "domestic", title: "", content: "", tags: [] });
  };

  return (
    <>
      <select onChange={handleSelect} name="category">
        <option>카테고리 선택</option>
        {selectList.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <ImageUploadForm setImage={setImage} />
      <input
        name="title"
        type="text"
        placeholder="제목을 작성하세요."
        value={story.title}
        onChange={onChange}
      />

      <div>
        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTag(event) : null)}
          placeholder="태그를 입력할 수 있습니다. 원하는 태그를 적고 엔터키를 치세요~"
        />
        <ul>
          {story.tags.map((el, index) => {
            return (
              <li key={"tagInput" + index}>
                <span>{el}</span>
                <span onClick={() => removeTag(index)}>&times;</span>
              </li>
            );
          })}
        </ul>
      </div>
      <textarea
        name="content"
        placeholder="내용을 작성하세요."
        value={story.content}
        onChange={onChange}
      />
      <button onClick={onSubmit} value="새 글 등록">
        새 글 등록
      </button>
    </>
  );
};

export default NewStory;
