import { useAppDispatch } from "../hooks";
import { useEffect, useState } from "react";
import { setLoginState } from "../userSlice";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

const Naver = () => {
  const [user, setUser] = useState(null);
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
      if (status) {
        setUser({ ...naverLogin.user });
        dispatch(setLoginState(true));

        navigate("/");
        window.close();
      }
    });
  };

  console.log(user);

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
