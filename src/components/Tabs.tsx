import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

import { CategoryInfo } from "./Category";
import { addCategory, removeTag, storyData } from "@redux/slices/storySlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks/reduxHooks";

const AntTab = styled(Tab)(({ theme }) => ({
  "&:hover": {
    color: "#ff6e40",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#ff6e40",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

const TabsBtn = ({ categoryList }: { categoryList: CategoryInfo[] }) => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(storyData);

  const [value, setValue] = useState(category.value);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(removeTag());
    setValue(newValue);
    dispatch(
      addCategory({ name: categoryList[newValue].value, value: newValue })
    );
  };

  useEffect(() => {
    if (category.name === "total") {
      setValue(0);
    }
  }, [category]);

  return (
    <Box sx={{ maxWidth: 330, bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {categoryList.map((list, idx) => (
          <AntTab key={idx} label={list.name} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsBtn;
