// Import Express Router
const { Router } = require('express');
const paymentController = require('../controllers/payment'); // Import the Payment Controller

// Create an instance of Express Router
const paymentRouter = Router();

// Define Routes for Payments
// Route to create a new payment
paymentRouter.post('/', paymentController.createPayment);

// Route to get all payments
paymentRouter.get('/', paymentController.getAllPayments);

// Route to get payments by user
paymentRouter.get('/user/:userId', paymentController.getPaymentsByUser);

// Route to update payment status
paymentRouter.patch('/status', paymentController.updatePaymentStatus);

// Export the payment router
module.exports = paymentRouter;
