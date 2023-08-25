import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

const TopButtonContainer = styled.div`
  position: sticky;
  cursor: pointer;
  left: 80%;
  bottom: 50px;
  color: #ff8f00;
  background: white;
  transition-duration: 0.5s;
  border-radius: 50%;
  > svg {
    font-size: 40px;
  }

  &:hover {
    color: #ffab91;
  }
`;

const TopButton = () => {
  const [active, setActive] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShowButton = () => {
    if (window.scrollY > 300) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      {active && (
        <TopButtonContainer id="top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faCircleUp} />
        </TopButtonContainer>
      )}
    </>
  );
};

export default TopButton;
