import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@routes/Auth";
import Main from "@routes/Main";
import { useAppSelector } from "../hooks";
import { checkLoginState } from "../loginSlice";
import NavBar from "@components/NavBar";
import Profile from "@routes/Profile";
import New from "@routes/NewStory";
import Story from "@routes/Story";

const AppRouter = () => {
  const { loginState } = useAppSelector(checkLoginState);

  return (
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
    </Router>
  );
};

export default AppRouter;
