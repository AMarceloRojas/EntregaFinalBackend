import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: String,
  purchase_datetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: String,
  products: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    status: String
  }]
});

export default mongoose.model('Ticket', ticketSchema);
