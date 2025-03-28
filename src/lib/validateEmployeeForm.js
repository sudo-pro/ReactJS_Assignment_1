export const validateEmployeeForm = (formData) => {
  const errors = {}; // Initialize errors as an object to collect errors for each field.

  // Validate Full Name
  const nameRegex = /^[A-Za-z \s]+$/; // Only alphabetic characters and spaces
  if (!formData.fullName) {
    errors.fullName = "Full Name is required.";
  } else if (!nameRegex.test(formData.fullName)) {
    errors.fullName = "Full Name can only contain alphabetic characters and spaces.";
  }

  // Validate Birthdate
  const birthdate = new Date(formData.birthdate);
  const today = new Date();
  
  // Check if the birthdate is a valid date
  if (isNaN(birthdate)) {
    errors.birthdate = "Invalid birthdate.";
  } else {
    const age = today.getFullYear() - birthdate.getFullYear();
    const isAdult = age > 18 || (age === 18 && today.getMonth() > birthdate.getMonth()) || (age === 18 && today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());

    if (!formData.birthdate) {
      errors.birthdate = "Birthdate is required.";
    } else if (!isAdult) {
      errors.birthdate = "You must be at least 18 years old.";
    }
  }

  // Validate Department
  if (!formData.department) {
    errors.department = "Department is required.";
  }

  // Validate Experience
  if (formData.experience === undefined || formData.experience === null) {
    errors.experience = "Experience is required.";
  } else if (isNaN(formData.experience) || formData.experience < 0 || formData.experience > 50) {
    errors.experience = "Experience must be a number between 0 and 50.";
  }

  return errors;
};
