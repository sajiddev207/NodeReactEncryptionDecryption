
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate, Navigate
} from "react-router-dom";

import Header from "./component/Header/Header";
// import Footer from "./component/Footer/Footer";

import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import UserList from "./Pages/UserList/UserList";
import Protected from "./component/Protected/Protected";
import Page404 from "./component/Page404/Page404";
export default function App() {
  // const navigate = useNavigate();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="userlist" element={<UserList />} />
      </Routes>
    </Router>
  );
}
