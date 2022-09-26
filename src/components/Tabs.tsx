import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

import { CategoryInfo } from "./Category";
import { addCategory, storyData } from "../storySlice";
import { useAppDispatch, useAppSelector } from "../hooks";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    dispatch(addCategory(categoryList[newValue].value));
  };

  useEffect(() => {
    if (category === "total") {
      setValue(0);
    }
  }, [category]);

  return (
    <Box sx={{ maxWidth: { xs: 330, sm: 480 }, bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {categoryList.map((list, idx) => (
          <AntTab key={idx} label={list.name} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsBtn;
