import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@routes/Auth";
import Main from "@routes/Main";
import { useAppSelector } from "../hooks";
import { userState } from "../userSlice";

const AppRouter = () => {
  const { loginState } = useAppSelector(userState);

  return (
    <Router>
      <Routes>
        {loginState ? (
          <Route path="/" element={<Main />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
