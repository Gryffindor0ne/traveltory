import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

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

export type StoryDataType = {
  stories: StoryInfo[];
  tag: string;
};

const initialState: StoryDataType = {
  stories: [],
  tag: "",
};

export const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    updateStory: (state, action: PayloadAction<StoryInfo[]>) => {
      console.log(action.payload);
      state.stories = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.tag = action.payload;
    },
    removeTag: (state) => {
      state.tag = "";
    },
  },
});

export const { updateStory, addTag, removeTag } = storySlice.actions;

export const storyData = (state: RootState) => state.stories;

export default storySlice.reducer;
