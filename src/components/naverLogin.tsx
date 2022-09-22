import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import { setLoginState, setNaverLoginState } from "../loginSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../userSlice";

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

const Naver = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: "http://localhost:3000",
    isPopup: false,
    loginButton: { color: "green", type: 3, height: 40 },
  });

  const getUser = async () => {
    await naverLogin.getLoginStatus((status: any) => {
      console.log(status);
      console.log(naverLogin.user);
      if (status) {
        dispatch(setLoginState(true));
        dispatch(setNaverLoginState(true));
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
  }, []);

  return <div id="naverIdLogin" />;
};

export default Naver;
