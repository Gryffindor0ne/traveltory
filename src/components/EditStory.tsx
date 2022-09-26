import { dbService } from "@apis/f-base";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import ImageUploadForm from "@components/ImageUploadForm";
import { StoryInfo } from "../storySlice";
import { selectList } from "@routes/NewStory";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled as styledM } from "@mui/material/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const CustomMenuItem = styledM(MenuItem)(({ theme }) => ({
  "&:hover": {
    color: "#ff6e40",
    opacity: 1,
  },
  "&.MenuItem.Mui-selected": {
    color: "#ff6e40",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

const EditStoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 1rem auto 5rem auto;
`;

const TagContainer = styled.div`
  > ul {
    display: flex;
    margin: 0.5rem 0;
    flex-wrap: wrap;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      font-size: 0.7em;
      margin: 0.5rem;
      word-break: keep-all;
      border-radius: 10px;
      color: #ffffff;
      background-color: #ff8f00;
      padding: 10px;
      > span {
        > svg {
          cursor: pointer;
          font-size: 1rem;
          margin-left: 0.2rem;
        }
      }
    }
  }
`;

const TagInput = styled.input`
  width: 100%;
  height: 2rem;
  border: none;
  border-radius: 10px;
  background: #ffe0b2;

  font-size: 0.8rem;
  outline: none;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

  ::placeholder {
    color: #8d8d8d;
    font-size: 0.8rem;
  }
`;

const ContentInput = styled.textarea`
  height: 20rem;
  border: none;
  border-radius: 10px;
  background: #ffe0b2;
  font-size: 0.8rem;
  outline: none;
  line-height: 1.7rem;
  padding: 1rem;

  ::placeholder {
    color: #8d8d8d;
    font-size: 0.8rem;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 300px;
  margin-top: 1rem;
`;

const EditBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #ffab91;
  border-radius: 10px;
  color: #ff8f00;
  font-weight: bold;
  font-size: 0.7rem;
  width: 7rem;
  height: 2rem;
  margin-right: 0.5rem;
  padding: 8px;

  :hover {
    border: none;
    background: #ff8f00;
    color: white;
    font-weight: bold;
  }
`;

const CancelBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #ffab91;
  border-radius: 10px;
  color: #ff8f00;
  font-weight: bold;
  font-size: 0.7rem;
  width: 4rem;
  height: 2rem;
  padding: 8px;

  :hover {
    border: none;
    background: #ff8f00;
    color: white;
    font-weight: bold;
  }
`;

const EditStory = ({
  story,
  setIsEdit,
}: {
  story: StoryInfo | undefined;
  setIsEdit: (prev: boolean) => void;
}) => {
  const [newStory, setNewStory] = useState(story as StoryInfo);
  const [newImageURL, setNewImageURL] = useState<string>(story?.image ?? "");

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

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target as HTMLSelectElement;
    setNewStory({ ...newStory, [name]: value });
  };

  const onSubmit = async () => {
    const storyObj = {
      ...newStory,
      image: newImageURL ?? story?.image,
    };
    try {
      await updateDoc(doc(dbService, "stories", `${story?.id}`), storyObj);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EditStoryContainer>
      <ImageUploadForm imageURL={newImageURL} setImageURL={setNewImageURL} />
      <FormControl variant="standard" sx={{ m: 1, width: "12ch" }}>
        <InputLabel id="demo-simple-select-standard-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={newStory.category}
          label="category"
          name="category"
          onChange={handleSelect}
        >
          {selectList.map((option) => (
            <CustomMenuItem value={option.value} key={option.value}>
              {option.name}
            </CustomMenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "28ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="제목"
          variant="standard"
          name="title"
          type="text"
          placeholder="제목을 작성하세요."
          value={newStory.title}
          onChange={onChange}
        />
      </Box>

      <TagContainer>
        <TagInput
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTag(event) : null)}
          placeholder="태그"
        />
        <ul>
          {newStory.tags.map((el, index) => {
            return (
              <li key={"tagInput" + index}>
                <span>{el}</span>
                <span onClick={() => removeTag(index)}>
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </span>
              </li>
            );
          })}
        </ul>
      </TagContainer>

      <ContentInput
        name="content"
        placeholder="내용을 작성하세요."
        value={newStory.content}
        onChange={onChange}
      />
      <BtnContainer>
        <EditBtn onClick={onSubmit}>스토리 수정</EditBtn>
        <CancelBtn onClick={(prev) => setIsEdit(!prev)}>취소</CancelBtn>
      </BtnContainer>
    </EditStoryContainer>
  );
};

export default EditStory;
