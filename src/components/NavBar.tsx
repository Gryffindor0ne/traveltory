import React from "react";
import { Link } from "react-router-dom";
import { removeTag } from "../storySlice";

import { useAppDispatch } from "../hooks";

function NavBar() {
  const dispatch = useAppDispatch();
  return (
    <>
      <nav>
        <div>
          <Link
            to="/"
            onClick={() => {
              dispatch(removeTag());
            }}
          >
            My Traveltory
          </Link>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => {
                  dispatch(removeTag());
                }}
              >
                홈
              </Link>
            </li>
            <li>
              <Link to="/story/new">글쓰기</Link>
            </li>
            <li>
              <Link to="/profile">내 정보</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
