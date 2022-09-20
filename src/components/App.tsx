import { authService } from "@apis/f-base";
import React, { useEffect, useState } from "react";
import "../App.css";
import AppRouter from "./Router";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    setLoading(true);
  }, []);

  return <>{loading ? <AppRouter isLoggedIn={isLoggedIn} /> : "Loading..."}</>;
}

export default App;
