// 

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";

import Layout from "./components/Layout";
import UserDetails from "./components/UserDetails";
import UserForm from "./components/UserForm";
import Navbar from "./components/Navbar"; // Import Navbar

// Wrapper component to conditionally show Navbar
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/register"; // Hide on login & register

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? "" : "pt-16"}>{children}</div>
    </>
  );
};

const ProtectedRoutes = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/home" element={<Layout />} />
      <Route path="/userDetails" element={<UserDetails />} />
      <Route path="/userForm" element={<UserForm />} />
      <Route path="/edit/:id" element={<UserForm />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <MainLayout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

                   {/* All Protected Routes */}
                   <Route path="/*" element={<ProtectedRoutes />} />

          
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
