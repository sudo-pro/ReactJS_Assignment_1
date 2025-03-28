import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "../redux/employeesSlice";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  }

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const nameMatch = employee.fullName
        .toLowerCase()
        .includes(lowercasedTerm);
      const departmentMatch = employee.department
        .toLowerCase()
        .includes(lowercasedTerm);
      if (searchBy == "name") {
        return nameMatch;
      } else if (searchBy == "department") {
        return departmentMatch;
      }
    });
  }, [employees, searchTerm, searchBy]);

  // Sort employees based on selected criteria and order
  const sortedEmployees = useMemo(() => {
    return filteredEmployees.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.fullName.localeCompare(b.fullName);
      } else if (sortBy === "experience") {
        comparison = a.experience - b.experience;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredEmployees, sortBy, sortOrder]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6 bg-[#c9a8df67] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Employee List</h2>

        {/* Search and Filter Section */}
        <div className="my-5 flex gap-5 bg-[#daf3a0ce] p-2 rounded-2xl ">
          <div className="flex justify-between gap-1 rounded-2xl w-4/5 p-0.5 border-2 border-gray-900 bg-[#f3c1c196]">
            <input
              type="text"
              placeholder="Search by name or department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-gray-900 rounded-2xl w-4/5 p-2 bg-[#d0f5a593]"
            />

            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="border border-gray-700 bg-[#b0b0fc] rounded-2xl p-2 w-1/5 font-semibold "
            >
              <option value="name">Name</option>
              <option value="department">Department</option>
            </select>
          </div>

          {/* Sort Section */}
          <div className="px-2 border-2 border-gray-900 rounded-2xl flex items-center justify-between">
            <label className="mr-2 font-bold text-[#102494]">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-700 bg-[#b0b0fc] rounded-2xl p-2"
            >
              <option value="name">Name</option>
              <option value="experience">Experience</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>

        {/* Employee List */}
        {sortedEmployees.length === 0 ? (
          <p className="flex items-center justify-center font-bold">
            No employees found
          </p>
        ) : (
          <ul>
              <table className="min-w-full table-auto mt-5 border-collapse">
                <thead className="font-bold text-md text-left">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Experience (Years)</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {sortedEmployees.map((employee) => (
                  <tr key={employee.id} className="border">
                    <td className="px-4 py-2">{employee.fullName}</td>
                    <td className="px-4 py-2">{employee.department}</td>
                    <td className="px-4 py-2">{employee.experience}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(employee.id)}
                        className="bg-yellow-500 text-black font-semibold py-1 px-4 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="bg-red-500 text-black font-semibold py-1 px-4 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
          </ul>
        )}
      </div>
    </Layout>
  );
};
