import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import Layout from "./Layout";
import LoginPage from "./Pages/LoginPage";
import Login from "./Components/Login";
import RegisterPage from "./Pages/RegisterPage";
import HostingPage from "./Pages/HostingPage";
import axios from "axios";
import UserContextProvider, { UserContext } from "../UserContext";
import Register from "./Components/Register";
import { useContext } from "react";
import PrivateRoute from "./PrivateRoute";
import Logout from "./Components/Logout";
import BecomeAHostHeader from "./Components/BecomeAHostHeader";
import BecomeAHostLayout from "./BecomeAHostLayout";
import AboutYourPlace from "./Pages/AboutYourPlace";
import StructurePage from "./Pages/StructurePage";
import BecomeAHostPage from "./Pages/BecomeAHostPage";
import BecomeAHostOverviewPage from "./Pages/BecomeAHostOverviewPage";
import ModifyYourPlace from "./Components/ModifyYourPlace";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/hosting"
          element={
            <PrivateRoute>
              <HostingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/become-a-host"
          element={
            <PrivateRoute>
              <BecomeAHostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/become-a-host/overview"
          element={
            <PrivateRoute>
              <BecomeAHostOverviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/become-a-host/:placeId/overview"
          element={
            <PrivateRoute>
              <BecomeAHostOverviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/become-a-host/:placeId"
          element={
            <PrivateRoute>
              <BecomeAHostLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/become-a-host/:placeId/:stage"
            element={<ModifyYourPlace />}
          />
        </Route>
        <Route path="*" element={<div></div>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<div></div>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
