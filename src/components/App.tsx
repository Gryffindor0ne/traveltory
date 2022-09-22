import { authService } from "@apis/f-base";
import React, { useEffect, useState } from "react";

import "../App.css";
import AppRouter from "./Router";
import { useAppDispatch } from "../hooks";
import { setLoginState, setNaverLoginState } from "../loginSlice";
import { setUser } from "../userSlice";

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: "http://localhost:3000",
  });

  useEffect(() => {
    naverLogin.getLoginStatus((status: any) => {
      if (status) {
        dispatch(setLoginState(true));
        dispatch(setNaverLoginState(true));
        dispatch(setUser({ ...naverLogin.user }));
      } else {
        authService.onAuthStateChanged(async (user) => {
          console.log(user);
          if (user) {
            dispatch(setLoginState(true));
            dispatch(
              setUser({
                name: user.displayName || user.email?.split("@")[0],
                email: user.email,
                id: user.uid,
                nickname: user.email?.split("@")[0],
                profile_image: user.photoURL || null,
              })
            );
          } else {
            dispatch(setLoginState(false));
          }
        });
      }
      setLoading(true);
    });
  }, []);

  return <>{loading ? <AppRouter /> : "Loading..."}</>;
}

export default App;
