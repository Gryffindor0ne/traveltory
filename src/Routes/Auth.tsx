import React from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { authService } from "@apis/f-base";
import Naver from "@components/naverLogin";

const Auth = () => {
  const onSocialClick = async (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLButtonElement;

    let provider: any;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "facebook") {
      provider = new FacebookAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <button onClick={onSocialClick} name="google">
        Google Login
      </button>
      <button onClick={onSocialClick} name="facebook">
        Facebook Login
      </button>
      <Naver />
    </div>
  );
};

export default Auth;
