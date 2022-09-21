import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type loginType = {
  loginState: boolean;
};

const initialState: loginType = {
  loginState: false,
};

export const userSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.loginState = action.payload;
    },
  },
});

export const { setLoginState } = userSlice.actions;

export const userState = (state: RootState) => state.loginState;

export default userSlice.reducer;
