import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Only HomePage for now
import HomePage from "../pages/Home/HomePage";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
