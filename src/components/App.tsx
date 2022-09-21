import { authService } from "@apis/f-base";
import React, { useEffect, useState } from "react";

import "../App.css";
import AppRouter from "./Router";
import { useAppDispatch } from "../hooks";
import { setLoginState } from "../userSlice";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoginState(true));
      } else {
        dispatch(setLoginState(false));
      }
    });

    setLoading(true);
  }, []);

  return <>{loading ? <AppRouter /> : "Loading..."}</>;
}

export default App;
