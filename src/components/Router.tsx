import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Auth from "@routes/Auth";
import Main from "@routes/Main";
import Profile from "@routes/Profile";
import New from "@routes/NewStory";
import Story from "@routes/Story";
import NavBar from "@components/NavBar";
import { useAppSelector } from "../hooks";
import { checkLoginState } from "../loginSlice";
import TopButton from "./TopButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 890px;
  margin-top: 2rem;
  margin: 0 auto;
`;

const AppRouter = () => {
  const { loginState } = useAppSelector(checkLoginState);

  return (
    <Container>
      <Router>
        {loginState && <NavBar />}
        <Routes>
          {loginState ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/story/:id" element={<Story />} />
              <Route path="/story/new" element={<New />} />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
        <TopButton />
      </Router>
    </Container>
  );
};

export default AppRouter;
