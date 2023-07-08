import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5001/login", {
        code,
      })
      .then((res) => {
        console.log(res.data);
        window.history.pushState({}, null, "/");
        console.log("hello then");
      })
      .catch(() => {
        window.location = "/";
      })
      .finally(() => {
        window.history.pushState({}, null, "/");
        console.log("hello finally");
      });
  }, [code]);
}
