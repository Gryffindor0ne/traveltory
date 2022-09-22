import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>내 여행 기록</div>
      <div onClick={() => navigate("/story/new")}>글쓰기</div>
    </div>
  );
};

export default Main;
