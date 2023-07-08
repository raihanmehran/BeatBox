import { useEffect } from "react";
import axios from "axios";

export default function GetUsers() {
  return axios
    .get("http://localhost:3001/users")
    .then((response) => response.json())
    .catch(() => {
      window.location = "/";
    });
}
