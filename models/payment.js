const { Schema, model } = require('mongoose');

// Define the Payment Schema
const PaymentSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'user', // Matches the model name in user.js (lowercase)
    required: true 
  },
  bookingId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Booking', // /////////////Placeholder for Booking reference
    required: false 
  },
  amount: { type: Number, required: true }, // Payment amount
  currency: { type: String, required: true }, // Payment currency
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  }, // Payment status
  createdAt: { type: Date, default: Date.now }, // Timestamp for payment creation
});

// Export the Payment Model
module.exports = model('Payment', PaymentSchema);

