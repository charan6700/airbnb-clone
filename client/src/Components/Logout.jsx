import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function Logout() {
  const [ready, setReady] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    axios.post("/logout").then((loggedOut) => {
      console.log(loggedOut);
      setUser(null);
      setReady(true);
    });
  });

  if (!ready) return <div>Logging out...</div>;

  return <Navigate to="/" />;
}
