import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type userType = {
  name: string | undefined;
  email: string | null;
  id: string;
  nickname: string | undefined;
  profile_image: string | null;
};

const initialState: userType = {
  name: "",
  email: "",
  id: "",
  nickname: "",
  profile_image: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.profile_image = action.payload.profile_image;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userState = (state: RootState) => state.userInfo;

export default userSlice.reducer;
