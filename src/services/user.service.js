import UserRepository from '../repositories/UserRepository.js';
import UserDAO from '../daos/user.dao.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { validatePassword } from '../utils/validatePassword.js';

const userRepo = new UserRepository(new UserDAO());

export const registerUser = async ({ name, email, password, role }) => {
  const exists = await userRepo.findByEmail(email);
  if (exists) throw new Error('El usuario ya existe');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    // 👉 permite asignar 'admin' desde el body solo si se especifica, sino será 'user'
    role: role === 'admin' ? 'admin' : 'user'
  };

  return await userRepo.save(newUser);
};

export const loginUser = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');

  const valid = await validatePassword(password, user.password);
  if (!valid) throw new Error('Contraseña incorrecta');

  const token = generateToken({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  return token;
};
