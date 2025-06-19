import { transport } from '../config/mailer.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository.js';
import UserDAO from '../daos/user.dao.js';

const userRepo = new UserRepository(new UserDAO());

export const sendRecoveryEmail = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const link = `${process.env.BASE_URL}/reset-password/${token}`;
  await transport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Recuperación de contraseña',
    html: `<p>Haz clic <a href="${link}">aquí</a> para restablecer tu contraseña.</p>`
  });
};

export const resetPassword = async (email, newPassword) => {
  const user = await userRepo.findByEmail(email);
  const samePassword = await bcrypt.compare(newPassword, user.password);
  if (samePassword) throw new Error('La nueva contraseña no puede ser igual a la anterior');
  const hashed = await bcrypt.hash(newPassword, 10);
  return await userRepo.updatePassword(email, hashed);
};
