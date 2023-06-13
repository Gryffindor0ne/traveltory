import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@common/loginSlice";
import userReducer from "@common/userSlice";
import storyReducer from "@common/storySlice";

export const store = configureStore({
  reducer: {
    loginState: loginReducer,
    userInfo: userReducer,
    stories: storyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
