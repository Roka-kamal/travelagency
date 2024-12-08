require('dotenv').config({ path: './.env' });

const PaymentModel = require('../models/Payment'); // Import the Payment model
const userModel = require('../models/user'); // Import the User model


const Stripe = require('stripe'); // Import Stripe

const STRIPE_SECRET_KEY="sk_test_51QT8VALECqYESx26qvv5QzC6vlJZyY0HPBFr1fN0aIb2J6hJnk8ymIRc8pKbAPbwjvxtuVpkhYl6pEJ2JP0x8wYx00ICi1fcy2"
const stripe = Stripe(STRIPE_SECRET_KEY); // Create a Stripe instance with the secret key


/*const stripe = Stripe(process.env.STRIPE_SECRET_KEY);*/ // Initialize Stripe with the secret key

/*const stripe = Stripe('sk_test_your_secret_key_here');
console.log('Stripe Initialized:', stripe ? 'Success' : 'Failed');*/


// Service to create a new payment using Stripe
module.exports.createPayment = async (data) => {
  try {
    const { customerEmail, amount, currency } = data;

    // Step 1: Check if the user exists by email
    const user = await userModel.findOne({ email: customerEmail });
    if (!user) {
      throw new Error('User not found with the provided email');
    }

    // Step 2: Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in the smallest currency unit (e.g., cents for USD)
      currency: currency,
      description: `Payment by ${user.fname} ${user.lname}`,
      metadata: { userId: user._id.toString() },
    });

    // Step 3: Save the payment record in the database
    const payment = new PaymentModel({
      customerEmail, // Use customerEmail in the payment record
      userId: user._id,  // Store user ID in the payment record
      amount,
      currency,
      status: 'pending',
      stripePaymentIntentId: paymentIntent.id, // Save Stripe's payment intent ID
    });

    const savedPayment = await payment.save();

    // Step 4: Return the client secret to the frontend
    return {
      message: 'Payment intent created successfully',
      clientSecret: paymentIntent.client_secret, // Used by the frontend to complete the payment
      payment: savedPayment,
    };
  } catch (err) {
    throw new Error(`Could not create payment: ${err.message}`);
  }
};

// Service to confirm payment with Stripe
module.exports.confirmPayment = async (paymentIntentId) => {
  try {
    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update payment status in the database
      const payment = await PaymentModel.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntentId },
        { status: 'completed' },
        { new: true } // Return the updated payment
      );
      return payment;
    } else {
      throw new Error('Payment not yet completed');
    }
  } catch (err) {
    throw new Error(`Could not confirm payment: ${err.message}`);
  }
};

// Service to find all payments
module.exports.findAllPayments = async () => {
  try {
    const payments = await PaymentModel.find().populate('userId', 'fname lname email'); // Retrieve all payments and populate user details
    return payments;
  } catch (err) {
    throw new Error(`Could not retrieve payments: ${err.message}`);
  }
};

// Service to find payments by user
module.exports.findPaymentsByUser = async (userId) => {
  try {
    const payments = await PaymentModel.find({ userId }).populate('userId', 'fname lname email phone'); // Retrieve payments for a specific user and populate user details
    return payments;
  } catch (err) {
    throw new Error(`Could not retrieve payments for user: ${err.message}`);
  }
};

// Service to update payment status (Modify based on email)
module.exports.updatePaymentStatus = async (email, status) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const updatedPayment = await PaymentModel.findOneAndUpdate(
      { userId: user._id },  // Use user ID for matching
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      throw new Error('Payment not found');
    }

    return updatedPayment;
  } catch (err) {
    throw new Error(`Could not update payment status: ${err.message}`);
  }
};