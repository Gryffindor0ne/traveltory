import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { setUser } from "@common/userSlice";
import { useAppDispatch } from "@common/hooks/reduxHooks";
import { setLoginState } from "@common/loginSlice";
declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

const AuthBtn = styled.button`
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 10px 0px;
  background: #f9a825;
`;

const Naver = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    // callbackUrl: "http://localhost:3000",
    callbackUrl: "https://my-traveltory.web.app",
    isPopup: false,
    loginButton: { color: "green", type: 3, height: 50 },
  });

  const getUser = async () => {
    await naverLogin.getLoginStatus((status: any) => {
      if (status) {
        dispatch(setLoginState(true));
        dispatch(setUser({ ...naverLogin.user }));
        navigate("/");
        window.close();
      }
    });
  };

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    naverLogin.init();
    getUser();
    userAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser, userAccessToken]);

  return <AuthBtn id="naverIdLogin" />;
};

export default Naver;
