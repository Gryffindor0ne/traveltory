import React from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";

import { authService } from "@apis/f-base";
import Naver from "@components/naverLogin";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12rem;
`;
const Title = styled.div`
  font-size: 5rem;
`;

const SubTitle = styled.div`
  font-size: 2.3rem;
  margin-top: 2rem;
`;

const AuthBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserGuideText = styled.div`
  font-size: 1rem;
  margin: 1rem;
`;

const AuthBtns = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

const AuthBtn = styled.button`
  width: 20rem;
  border: none;
  background: white;
  cursor: pointer;
  padding: 10px 0px;
`;
const GoogleBtnLine = styled.div`
  width: 20.2rem;
  height: 4.3rem;
  border: solid 1px grey;
  border-radius: 10px;
`;

const SocialLoginImg = styled.img`
  width: 20rem;
  height: 4.2rem;
  border-radius: 10px;
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
        <Title>My Traveltory</Title>
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
