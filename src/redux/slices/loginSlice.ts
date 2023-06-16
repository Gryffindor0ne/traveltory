import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type loginType = {
  loginState: boolean;
};

const initialState: loginType = {
  loginState: false,
};

export const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
  },
});

export const { setLoginState } = loginSlice.actions;

export const checkLoginState = (state: RootState) => state.loginState;

export default loginSlice.reducer;
