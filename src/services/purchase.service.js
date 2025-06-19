import Ticket from '../models/Ticket.js';
import Product from '../models/Product.js'; // Asegúrate de tener este modelo
import { v4 as uuidv4 } from 'uuid';

export const processPurchase = async (cart, userEmail) => {
  let totalAmount = 0;
  const processedProducts = [];

  for (const item of cart) {
    const product = await Product.findById(item.productId);
    if (!product) continue;

    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await product.save();

      processedProducts.push({
        productId: product._id,
        quantity: item.quantity,
        status: 'comprado'
      });

      totalAmount += product.price * item.quantity;
    } else {
      processedProducts.push({
        productId: product._id,
        quantity: item.quantity,
        status: 'sin stock'
      });
    }
  }

  const ticket = await Ticket.create({
    code: uuidv4(),
    purchaser: userEmail,
    amount: totalAmount,
    products: processedProducts
  });

  return ticket;
};
