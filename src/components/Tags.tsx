import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks";
import { addTag } from "../storySlice";

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
          <span key={idx} onClick={tagClick}>
            {el}
          </span>
        );
      })}
    </>
  );
};

export default Tags;
