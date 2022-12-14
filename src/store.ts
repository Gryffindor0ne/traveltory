import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import storyReducer from "./storySlice";

export const store = configureStore({
  reducer: {
    loginState: loginReducer,
    userInfo: userReducer,
    stories: storyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
