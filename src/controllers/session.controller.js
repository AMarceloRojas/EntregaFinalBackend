import UserDTO from '../dtos/UserDTO.js';

export const getCurrentUser = (req, res) => {
  const safeUser = new UserDTO(req.user);
  res.json(safeUser);
};
