import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";
import storyReducer from "./slices/storySlice";

export const store = configureStore({
  reducer: {
    loginState: loginReducer,
    userInfo: userReducer,
    stories: storyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
