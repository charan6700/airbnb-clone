import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  if (!user) {
    axios.get("/profile").then(({ data }) => {
      setUser(data);
      setReady(true);
    });
  }

  if (!ready) return <div>Loading...</div>;
  else {
    return user ? children : <Navigate to={"/login"} />;
  }
}
