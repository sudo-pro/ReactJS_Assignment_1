import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "../pages/AddEmployeePage";
import EditEmployee from "../pages/EditEmployeePage";
import EmployeeList from "../pages/EmployeeListPage";
import HomePage from "../pages/HomePage";

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/list" element={<EmployeeList />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

