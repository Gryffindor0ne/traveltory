import { authService } from "@apis/f-base";
import React, { useEffect, useState } from "react";

import "../App.css";
import AppRouter from "./Router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setLoginState, setNaverLoginState, userState } from "../userSlice";

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
      } else {
        authService.onAuthStateChanged(async (user) => {
          if (user) {
            dispatch(setLoginState(true));
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
