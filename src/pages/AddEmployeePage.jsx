import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeesSlice";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";
import { validateEmployeeForm } from "../lib/validateEmployeeForm";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    birthdate: "",
    department: "",
    experience: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    birthdate: "",
    department: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form data
    const validationErrors = validateEmployeeForm(formData);
    setErrors(validationErrors);

    // If there are errors, prevent submission
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) {
      return; // Errors already set in state, no need to alert
    }

    // Dispatch the action to add the employee
    dispatch(addEmployee({ ...formData, id: uuid() }));

    // Reset the form data after submission
    setFormData({
      fullName: "",
      birthdate: "",
      department: "",
      experience: "",
    });

    // Redirect to the list page
    navigate("/list");
  };

  return (
    <Layout>
      <EmployeeForm
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        buttonName="Add Employee"
        errors={errors} // Pass down errors to display in form
      />
    </Layout>
  );
};
