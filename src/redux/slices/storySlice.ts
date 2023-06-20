import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type StoryInfo = {
  category: string;
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  likes: string[];
  writtenAt: string;
  writerId: string;
  writerNickName: string;
  writer_profile_image: string;
};

type categoryProp = {
  name: string;
  value: number;
};

export type StoryDataType = {
  stories: StoryInfo[];
  tag: string;
  category: categoryProp;
};

const initialState: StoryDataType = {
  stories: [],
  tag: "",
  category: { name: "total", value: 0 },
};

export const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    updateStory: (state, action: PayloadAction<StoryInfo[]>) => {
      state.stories = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
    removeTag: (state) => {
      state.tag = "";
    },
    addCategory: (state, action: PayloadAction<categoryProp>) => {
      state.category = action.payload;
    },
    removeCategory: (state) => {
      state.category = { name: "", value: 0 };
    },
  },
});

export const { updateStory, addTag, removeTag, addCategory, removeCategory } =
  storySlice.actions;

export const storyData = (state: RootState) => state.stories;

export default storySlice.reducer;
