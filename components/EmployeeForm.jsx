import React from 'react';

export default ({ handleSubmit, formData, handleChange, buttonName, errors }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-[#fdd5d55e] rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {buttonName === "Add Employee" ? "Add Employee" : "Edit Employee"}
      </h2>

      {/* Full Name */}
      <div className="mb-4">
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          className={`mt-1 block w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Birthdate */}
      <div className="mb-4">
        <label
          htmlFor="birthdate"
          className="block text-sm font-medium text-gray-700"
        >
          Birthdate
        </label>
        <input
          type="date"
          name="birthdate"
          id="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
          className={`mt-1 block w-full border ${errors.birthdate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
        />
        {errors.birthdate && (
          <p className="text-red-600 text-sm mt-1">{errors.birthdate}</p>
        )}
      </div>

      {/* Department */}
      <div className="mb-4">
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-700"
        >
          Department
        </label>
        <select
          name="department"
          id="department"
          value={formData.department}
          onChange={handleChange}
          required
          className={`mt-1 block w-full border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.department && (
          <p className="text-red-600 text-sm mt-1">{errors.department}</p>
        )}
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700"
        >
          Experience (years)
        </label>
        <input
          type="number"
          name="experience"
          id="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Enter experience in years"
          required
          className={`mt-1 block w-full border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
        />
        {errors.experience && (
          <p className="text-red-600 text-sm mt-1">{errors.experience}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-amber-400 text-black font-semibold py-2 rounded-md hover:bg-amber-500 transition duration-200"
      >
        {buttonName}
      </button>
    </form>
  );
};
