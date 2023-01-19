import React from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styled from "styled-components";

import { authService } from "@apis/f-base";
import Naver from "@components/naverLogin";

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
setScreenSize();
window.addEventListener("resize", setScreenSize);

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  justify-content: center;
  align-items: center;
  background: #f9a825;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem;
`;
const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  font-family: "DM Serif Display", serif;
  color: white;
`;

const AuthBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 320px;
`;

const SelectText = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Line = styled.hr`
  width: 100%;
  height: 1px;
  margin: 2rem 3rem;
  border-width: 0px;
  border-radius: 0.25rem;
  background: #eeeeee;
`;
const Text = styled.span`
  position: absolute;
  padding: 0 1rem;
  color: #eeeeee;
  background: #f9a825;
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
`;

const GuestLoginBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  background: #a33030;
  cursor: pointer;
  width: 14rem;
  padding: 13px 0px;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const AuthBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const AuthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 10px 0px;
  background: #f9a825;
`;

const GoogleBtnLine = styled.div`
  width: 14.5rem;
  height: 3.3rem;
  border-radius: 10px;
  padding: 0.2rem;
`;

const SocialLoginImg = styled.img`
  width: 14rem;
  height: 3.1rem;
  border-radius: 5px;
  background: #f9a825;
`;

const Auth = () => {
  const onSocialClick = async (e: React.MouseEvent<HTMLElement>) => {
    const name = (e.currentTarget as HTMLButtonElement).name;

    let provider: any;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "facebook") {
      provider = new FacebookAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  const guestLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        authService,
        `${process.env.REACT_APP_GUEST_LOGIN_EMAIL}`,
        `${process.env.REACT_APP_GUEST_LOGIN_PASSWORD}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>MY</Title>
        <Title>TRAVELTORY</Title>
      </TitleContainer>

      <AuthBtnContainer>
        <GuestLoginBtn onClick={guestLogin}>게스트 로그인</GuestLoginBtn>

        <SelectText>
          <Line />
          <Text>또는</Text>
        </SelectText>

        <AuthBtns>
          <AuthBtn onClick={onSocialClick} name="google">
            <GoogleBtnLine>
              <SocialLoginImg
                src="/images/google-login.png"
                alt="google btn"
                id="google"
              />
            </GoogleBtnLine>
          </AuthBtn>
          <AuthBtn onClick={onSocialClick} name="facebook">
            <SocialLoginImg src="/images/fb-login.png" alt="fb btn" />
          </AuthBtn>
          <Naver />
        </AuthBtns>
      </AuthBtnContainer>
    </Container>
  );
};

export default Auth;
