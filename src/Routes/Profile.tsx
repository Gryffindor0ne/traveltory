import React from "react";
import { signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setLoginState, setNaverLoginState } from "../loginSlice";
import { authService } from "@apis/f-base";
import { useNavigate } from "react-router-dom";
import { userState } from "../userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, email, nickname, profile_image } = useAppSelector(userState);

  const onLogOutClick = () => {
    localStorage.clear();
    signOut(authService);
    dispatch(setLoginState(false));
    dispatch(setNaverLoginState(false));

    navigate("/");
  };

  return (
    <>
      <div>나의 정보</div>
      {profile_image && <img src={profile_image} width="50px" height="50px" />}
      <div>이름 : {name}</div>
      <div>닉네임 : {nickname}</div>
      <div>이메일 : {email}</div>

      <div onClick={onLogOutClick}>Logout</div>
    </>
  );
};

export default Profile;
