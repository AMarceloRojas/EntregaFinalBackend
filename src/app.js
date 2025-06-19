import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import sessionRoutes from './routes/session.routes.js';
import productRoutes from './routes/product.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';

dotenv.config(); // Carga las variables de entorno

const app = express(); // Aquí se define app correctamente
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Habilita body-parser para JSON
connectDB(); // Conecta a MongoDB

// Rutas
app.use('/api/sessions', sessionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchase', purchaseRoutes);

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('🚀 API Ecommerce en funcionamiento');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
