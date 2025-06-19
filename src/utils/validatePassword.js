import bcrypt from 'bcrypt';

export const validatePassword = async (inputPassword, userHashedPassword) => {
  return await bcrypt.compare(inputPassword, userHashedPassword);
};
