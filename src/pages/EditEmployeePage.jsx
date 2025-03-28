import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editEmployee } from "../redux/employeesSlice";
import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";
import { validateEmployeeForm } from "../lib/validateEmployeeForm";

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state) =>
    state.employees.find((emp) => emp.id == id),
  );

  useEffect(() => {
    if (!employee) {
      alert("Employee not found!");
      navigate("/list");
    }
  }, [employee, navigate]);

  const [formData, setFormData] = useState(employee || {
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

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

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

    // Dispatch the action to edit the employee
    dispatch(editEmployee({ ...formData, id: id }));

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
        buttonName="Edit Employee"
        errors={errors} // Pass down errors to display in form
      />
    </Layout>
  );
};
