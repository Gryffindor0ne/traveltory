import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav>
        <div>
          <Link to="/">My Traveltory</Link>
          <ul>
            <li>
              <Link to="/">홈</Link>
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
