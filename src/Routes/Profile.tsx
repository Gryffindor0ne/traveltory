import React from "react";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../hooks";
import { setLoginState, setNaverLoginState } from "../userSlice";
import { authService } from "@apis/f-base";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogOutClick = () => {
    localStorage.clear();
    signOut(authService);
    dispatch(setLoginState(false));
    dispatch(setNaverLoginState(false));

    navigate("/");
  };

  return (
    <>
      <div>Profile</div>
      <div onClick={onLogOutClick}>Logout</div>
    </>
  );
};

export default Profile;
