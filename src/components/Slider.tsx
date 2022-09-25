import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { addCategory, storyData } from "../storySlice";
import { CategoryInfo } from "./Category";
import { useAppDispatch, useAppSelector } from "../hooks";

gsap.registerPlugin(Draggable);

const BtnContainer = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  max-width: 320px;
  align-items: center;
`;

const Btn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #e0e0e0;
  border-radius: 25px;
  background: white;
  color: #90a4ae;
  font-size: 0.8rem;
  font-weight: bold;
  width: 5.3rem;
  height: 2rem;
  margin: 0rem 0.1rem;

  &.active {
    background: #ff6e40;
    color: white;
    font-weight: bold;
    border: none;
  }
`;

type Iprop = {
  list: CategoryInfo;
  handler: (event: React.MouseEvent<HTMLElement>) => void;
};

const Slide = ({ list, handler }: Iprop) => {
  const { category } = useAppSelector(storyData);
  return (
    <span className="slide">
      <Btn
        value={list.value}
        onClick={handler}
        key={uuidv4()}
        className={list.value === category ? "active" : ""}
      >
        {list.name}
      </Btn>
    </span>
  );
};

const Slider = ({ categoryList }: { categoryList: CategoryInfo[] }) => {
  const sliderRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;

    if (target) {
      dispatch(addCategory(target.value));
    }
  };

  useEffect(() => {
    Draggable.create(sliderRef.current, {
      type: "x",
    });
  }, []);

  return (
    <BtnContainer id="slider" className="slider" ref={sliderRef}>
      {categoryList.map((list) => (
        <Slide key={uuidv4()} list={list} handler={handleCategoryClick} />
      ))}
    </BtnContainer>
  );
};

export default Slider;
