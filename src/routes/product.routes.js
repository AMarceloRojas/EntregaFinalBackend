import { Router } from 'express';
import { authorizeRole } from '../middlewares/authorizeRole.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post('/', auth, authorizeRole(['admin']), (req, res) => {
  res.send('Producto creado');
});

router.post('/cart', auth, authorizeRole(['user']), (req, res) => {
  res.send('Producto agregado al carrito');
});

export default router;
