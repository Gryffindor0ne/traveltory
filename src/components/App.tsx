import React, { useEffect, useState } from "react";

import AppRouter from "./Router";
import { authService } from "@apis/f-base";
import { useAppDispatch } from "@common/hooks/reduxHooks";
import { setLoginState } from "@common/loginSlice";
import { setUser } from "@common/userSlice";
import LoginIndicator from "@components/LoadingIndicator";

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

function App() {
  const [loading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    // callbackUrl: "http://localhost:3000",
    callbackUrl: "https://my-traveltory.web.app",
  });

  useEffect(() => {
    naverLogin.getLoginStatus((status: any) => {
      if (status) {
        dispatch(setLoginState(true));
        dispatch(setUser({ ...naverLogin.user }));
        setIsLoading(false);
      } else {
        authService.onAuthStateChanged(async (user) => {
          if (user) {
            dispatch(setLoginState(true));

            dispatch(
              setUser({
                name: user.displayName || user.email?.split("@")[0],
                email: user.email,
                id: user.uid,
                nickname: user.email?.split("@")[0],
                profile_image:
                  user.photoURL ||
                  "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
              })
            );
            setIsLoading(false);
          } else {
            dispatch(setLoginState(false));
            setIsLoading(false);
          }
        });
      }
    });
  });

  return <>{loading ? <LoginIndicator /> : <AppRouter />}</>;
}

export default App;
