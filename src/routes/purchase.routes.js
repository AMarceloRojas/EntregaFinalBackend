import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';
import { processPurchase } from '../services/purchase.service.js';

const router = Router();

router.post('/', auth, authorizeRole(['user']), async (req, res) => {
  try {
    const ticket = await processPurchase(req.body.cart, req.user.email);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

export default router;
