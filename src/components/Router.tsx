import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Auth from "@routes/Auth";
import Main from "@routes/Main";
import Profile from "@routes/Profile";
import New from "@routes/NewStory";
import Story from "@routes/Story";
import NavBar from "@components/layout/NavBar";
import { useAppSelector } from "@redux/hooks/reduxHooks";
import { checkLoginState } from "@redux/slices/loginSlice";
import TopButton from "./layout/TopButton";
import { useState } from "react";
import LoginIndicator from "@components/layout/LoadingIndicator";

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
  const [loading, setIsLoading] = useState<boolean>(false);

  const { loginState } = useAppSelector(checkLoginState);

  return (
    <Container>
      <Router>
        {loginState && <NavBar />}
        <Routes>
          {loginState ? (
            <>
              <Route path="/" element={<Main />} />
              <Route
                path="/profile"
                element={<Profile loadingStateControl={setIsLoading} />}
              />
              <Route path="/story/:id" element={<Story />} />
              <Route path="/story/new" element={<New />} />
            </>
          ) : loading ? (
            <Route path="/" element={<LoginIndicator />}></Route>
          ) : (
            <Route
              path="/"
              element={<Auth loadingStateControl={setIsLoading} />}
            />
          )}
        </Routes>
        <TopButton />
      </Router>
    </Container>
  );
};

export default AppRouter;
