import { dbService } from "@apis/f-base";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import ImageUploadForm from "@components/ImageUploadForm";
import { StoryInfo } from "../storySlice";
import { useNavigate } from "react-router-dom";

export const selectList = [
  { value: "domestic", name: "국내여행" },
  { value: "overseas", name: "해외여행" },
  { value: "day", name: "당일치기" },
  { value: "single", name: "홀로가기" },
  { value: "together", name: "함께가기" },
  { value: "tip", name: "여행노하우" },
];

const EditStory = ({
  stories,
  setIsEdit,
}: {
  stories: StoryInfo | undefined;
  setIsEdit: (prev: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [newStory, setNewStory] = useState(stories as StoryInfo);
  const [image, setImage] = useState<string>("");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target as HTMLButtonElement;

    setNewStory({ ...newStory, [name]: value });
  };
  console.log(newStory);

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLButtonElement;

    const filtered = newStory.tags.filter((el) => el === value);

    if (value !== "" && filtered.length === 0) {
      setNewStory({
        ...newStory,
        tags: [...newStory.tags, value],
      });
    }
    event.currentTarget.value = "";
  };

  const removeTag = (clickedIndex: number) => {
    setNewStory(() => {
      return {
        ...newStory,
        tags: newStory.tags.filter((_, index) => {
          return index !== clickedIndex;
        }),
      };
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target as HTMLSelectElement;
    setNewStory({ ...newStory, [name]: value });
  };

  const onSubmit = async () => {
    const storyObj = {
      ...newStory,
      image,
    };
    try {
      await updateDoc(doc(dbService, "stories", `${stories?.id}`), storyObj);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
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
        value={newStory.title}
        onChange={onChange}
      />

      <div>
        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTag(event) : null)}
          placeholder="태그를 입력할 수 있습니다. 원하는 태그를 적고 엔터키를 치세요~"
        />
        <ul>
          {newStory.tags.map((el, index) => {
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
        value={newStory.content}
        onChange={onChange}
      />
      <button onClick={onSubmit} value="스토리 수정">
        스토리 수정
      </button>
      <button onClick={(prev) => setIsEdit(!prev)}>취소</button>
    </>
  );
};

export default EditStory;
