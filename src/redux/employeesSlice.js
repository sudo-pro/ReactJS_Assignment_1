import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: [
    {
      id: "1234",
      fullName: "John Doe",
      department: "Engineering",
      experience: 5,
      birthdate: "1990-01-01",
    },
    {
      id: "5678",
      fullName: "Jane Smith",
      department: "HR",
      experience: 3,
      birthdate: "1992-02-02",
    },
  ],
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    editEmployee: (state, action) => {
      const index = state.findIndex((emp) => emp.id == action.payload.id);
      if (index != -1) {
        state[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      return state.filter((emp) => emp.id != action.payload);
    },
  },
});

export const { addEmployee, editEmployee, deleteEmployee } =
  employeesSlice.actions;
  
export default employeesSlice.reducer;
