import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@routes/Auth";
import Main from "@routes/Main";

const AppRouter = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Main />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
