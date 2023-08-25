import React from "react";
import styled from "styled-components";

import { selectList } from "@routes/NewStory";
import TabsBtn from "./Tabs";

const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 330px;
  margin-bottom: 2rem;
`;

export type CategoryInfo = {
  value: string;
  name: string;
};

const Category = () => {
  const categoryList = [{ value: "total", name: "전체" }, ...selectList];

  return (
    <CategoryContainer>
      <TabsBtn categoryList={categoryList} />
    </CategoryContainer>
  );
};

export default Category;
