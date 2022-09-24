import React from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
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
  width: auto;
  height: calc(var(--vh, 1vh) * 100);
  justify-content: center;
  align-items: center;
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
  color: #f9a825;
`;

const SubTitle = styled.div`
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const AuthBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 320px;
`;

const UserGuideText = styled.div`
  font-size: 1rem;
  margin: 1rem;
`;

const AuthBtns = styled.div`
  flex-direction: column;
  width: 100%;
`;

const AuthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: white;
  cursor: pointer;
  width: 20rem;
  padding: 10px 0px;
`;

const GoogleBtnLine = styled.div`
  width: 14.5rem;
  height: 3.3rem;
  border: solid 1.5px grey;
  border-radius: 10px;
`;

const SocialLoginImg = styled.img`
  width: 14rem;
  height: 3.1rem;
  border-radius: 5px;
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

  return (
    <Container>
      <TitleContainer>
        <Title>MY</Title>
        <Title>TRAVELTORY</Title>
        <SubTitle>여행 감성 공유 플랫폼</SubTitle>
      </TitleContainer>

      <AuthBtnContainer>
        <UserGuideText>간편로그인으로 이용하기</UserGuideText>
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
