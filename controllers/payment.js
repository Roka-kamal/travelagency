const paymentService = require('../services/payment'); // Import Payment service

// Controller to create a new payment
module.exports.createPayment = async (req, res) => {
  try {
    const paymentData = {
      userId: req.body.userId,
      amount: req.body.amount,
      currency: req.body.currency,
    };

    const result = await paymentService.createPayment(paymentData);
    res.status(201).send({
      message: 'Payment intent created successfully',
      clientSecret: result.clientSecret, // Pass the client secret to the frontend
      payment: result.payment,
    });
  } catch (err) {
    res.status(500).send({ error: err.message }); // Server error
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
    const { paymentId, status } = req.body;
    const updatedPayment = await paymentService.updatePaymentStatus(paymentId, status);
    res.status(200).send({
      message: 'Payment status updated successfully',
      payment: updatedPayment,
    });
  } catch (err) {
    res.status(500).send({ error: err.message }); // Server error
  }
};
