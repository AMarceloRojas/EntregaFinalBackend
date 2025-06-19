import { Router } from 'express';
import { getCurrentUser } from '../controllers/session.controller.js';
import { registerUser, loginUser } from '../services/user.service.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/current', auth, getCurrentUser);

export default router;
