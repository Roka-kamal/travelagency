const paymentService = require('../services/payment'); // Import Payment service
const userService = require('../services/users'); // Import User service

// Controller to create a new payment
module.exports.createPayment = async (req, res) => {
  try {
    const { email, amount, currency } = req.body;

    // Verify if the user exists by email
    const user = await userService.getUser(email); // Get user by email
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const paymentData = {
      customerEmail: email,  // Use email in the payment data
      amount,
      currency,
    };

    const result = await paymentService.createPayment(paymentData);
    res.status(201).send({
      message: 'Payment intent created successfully',
      clientSecret: result.clientSecret, // Pass the client secret to the frontend
      payment: result.payment,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
// Controller to confirm a payment
module.exports.confirmPayment = async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const payment = await paymentService.confirmPayment(paymentIntentId);
    res.status(200).send({
      message: 'Payment confirmed successfully',
      payment,
    });
  } catch (err) {
    res.status(500).send({ error: err.message }); // Server error
  }
};

// Controller to get all payments
module.exports.getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.findAllPayments();
    res.status(200).send({ payments });
  } catch (err) {
    res.status(500).send({ error: err.message }); // Server error
  }
};

// Controller to get payments by user
module.exports.getPaymentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const payments = await paymentService.findPaymentsByUser(userId);
    res.status(200).send({ payments });
  } catch (err) {
    res.status(500).send({ error: err.message }); // Server error
  }
};


// Controller to update payment status
module.exports.updatePaymentStatus = async (req, res) => {
  try {
    const { email, status } = req.body;

    // Verify if user exists by email
    const user = await userService.getUser(email);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Proceed with updating payment status
    const updatedPayment = await paymentService.updatePaymentStatus(user._id, status);
    res.status(200).send({
      message: 'Payment status updated successfully',
      payment: updatedPayment,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};