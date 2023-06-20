import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch } from "@redux/hooks/reduxHooks";
import { addTag } from "@redux/slices/storySlice";

const TagBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffab91;
  border-radius: 10px;
  background: white;
  color: #ff6e40;
  height: 1.5rem;
  /* font-size: 0.5rem; */
  font-weight: bold;
  margin: 0.3rem;
  padding: 0.8rem 0.7rem;

  :hover {
    border: none;
    background: #ff6e40;
    color: white;
    font-weight: bold;
  }
`;

const Tags = ({ tags }: { tags: string[] | undefined }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const tagClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;

    if (target) {
      dispatch(addTag(target.innerHTML));
      navigate("/");
    }
  };

  return (
    <>
      {tags?.map((el: string, idx) => {
        return (
          <TagBtn key={idx} onClick={tagClick}>
            {el}
          </TagBtn>
        );
      })}
    </>
  );
};

export default Tags;
