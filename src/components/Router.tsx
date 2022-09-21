import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@routes/Auth";
import Main from "@routes/Main";
import { useAppSelector } from "../hooks";
import { userState } from "../userSlice";
import NavBar from "@components/NavBar";
import Profile from "@routes/Profile";

const AppRouter = () => {
  const { loginState } = useAppSelector(userState);

  return (
    <Router>
      {loginState && <NavBar />}
      <Routes>
        {loginState ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
