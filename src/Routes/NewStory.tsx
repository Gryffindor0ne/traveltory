import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

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

import ImageUploadForm from "@components/ImageUploadForm";
import { dbService } from "@apis/f-base";
import { useAppSelector } from "../hooks";
import { userState } from "../userSlice";

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

const NewStoryContainer = styled.div`
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
      font-size: 0.5em;
      margin: 0.5rem;
      word-break: keep-all;
      border-radius: 10px;
      color: #ffffff;
      background-color: #ff8f00;
      padding: 7px;
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

const BackBtn = styled.span`
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

const RegisterBtn = styled.span`
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
  padding: 8px;
  margin-right: 0.5rem;

  :hover {
    border: none;
    background: #ff8f00;
    color: white;
    font-weight: bold;
  }
`;

type StoryData = {
  category: string;
  title: string;
  content: string;
  tags: string[];
  likes: string[];
};

export const selectList = [
  { value: "domestic", name: "????????????" },
  { value: "overseas", name: "????????????" },
  { value: "day", name: "????????????" },
  { value: "single", name: "????????????" },
  { value: "together", name: "????????????" },
  { value: "tip", name: "???????????????" },
];

const NewStory = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState<StoryData>({
    category: "",
    title: "",
    content: "",
    tags: [],
    likes: [],
  });
  const [imageURL, setImageURL] = useState<string>("");
  const { id, nickname, profile_image } = useAppSelector(userState);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target as HTMLButtonElement;

    setStory({ ...story, [name]: value });
  };

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

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target as HTMLSelectElement;
    setStory({ ...story, [name]: value });
  };

  const onSubmit = async () => {
    if (!story.category || !story.title || !story.content) {
      alert("???????????? ????????????, ??????, ????????? ?????? ?????? ???????????????.");
      return;
    }

    const storyObj = {
      ...story,
      writtenAt: Date.now(),
      writerId: id,
      writerNickName: nickname,
      writer_profile_image: profile_image,
      image: imageURL,
    };
    try {
      await addDoc(collection(dbService, "stories"), storyObj);
    } catch (error) {
      console.log(error);
    }
    setStory({
      category: "???????????? ??????",
      title: "",
      content: "",
      tags: [],
      likes: [],
    });
    setImageURL("");
    navigate("/");
  };

  return (
    <NewStoryContainer>
      <ImageUploadForm imageURL={imageURL} setImageURL={setImageURL} />
      <FormControl variant="standard" sx={{ m: 1, width: "12ch" }}>
        <InputLabel id="demo-simple-select-standard-label">????????????</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={story.category}
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
          label="??????"
          variant="standard"
          name="title"
          type="text"
          placeholder="????????? ???????????????."
          value={story.title}
          onChange={onChange}
        />
      </Box>

      <TagContainer>
        <TagInput
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTag(event) : null)}
          placeholder="??????"
        />
        <ul>
          {story.tags.map((el, index) => {
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
        placeholder="????????? ???????????????."
        value={story.content}
        onChange={onChange}
      />
      <BtnContainer>
        <RegisterBtn onClick={onSubmit}>??? ????????? ??????</RegisterBtn>
        <BackBtn
          onClick={() => {
            navigate("/");
          }}
        >
          <span>?????????</span>
        </BackBtn>
      </BtnContainer>
    </NewStoryContainer>
  );
};

export default NewStory;
