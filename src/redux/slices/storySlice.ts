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

export type StoryDataType = {
  stories: StoryInfo[];
  tag: string;
  category: string;
};

const initialState: StoryDataType = {
  stories: [],
  tag: "",
  category: "total",
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
    addCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    removeCategory: (state) => {
      state.category = "total";
    },
  },
});

export const { updateStory, addTag, removeTag, addCategory, removeCategory } =
  storySlice.actions;

export const storyData = (state: RootState) => state.stories;

export default storySlice.reducer;
