const { Schema, model } = require('mongoose');

// Define the Payment Schema
const PaymentSchema = new Schema({
  customerEmail: { 
    type: String, 
    required: true, 
  },
  bookingId: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true, // Payment amount
  },
  currency: { 
    type: String, 
    required: true, // Payment currency
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending',
  }, // Payment status

  createdAt: { type: Date, default: Date.now }, // Timestamp for payment creation
  
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'user', // Ensure correct user reference 
    required: true 
  }
});

module.exports = model('Payment', PaymentSchema);

