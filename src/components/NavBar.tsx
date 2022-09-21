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
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
