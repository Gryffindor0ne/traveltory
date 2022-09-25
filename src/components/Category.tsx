import React from "react";
import styled from "styled-components";

import { selectList } from "@routes/NewStory";
import Slider from "./Slider";

const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 320px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

export type CategoryInfo = {
  value: string;
  name: string;
};

const Category = () => {
  const categoryList = [{ value: "total", name: "전체" }, ...selectList];

  return (
    <CategoryContainer>
      <Slider categoryList={categoryList} />
    </CategoryContainer>
  );
};

export default Category;
