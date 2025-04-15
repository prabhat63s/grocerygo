export const validateUserInput = (email, password) => {
  const errors = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  if (!email || !emailRegex.test(email)) {
    errors.push("Please enter a valid email address");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  } else if (!strongPassword.test(password)) {
    errors.push("Password must contain at least one letter and one number");
  }

  return errors;
};
