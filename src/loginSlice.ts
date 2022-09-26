import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type loginType = {
  loginState: boolean;
  naverLoginState: boolean;
};

const initialState: loginType = {
  loginState: false,
  naverLoginState: false,
};

export const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
    setNaverLoginState: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
  },
});

export const { setLoginState, setNaverLoginState } = loginSlice.actions;

export const checkLoginState = (state: RootState) => state.loginState;

export default loginSlice.reducer;
