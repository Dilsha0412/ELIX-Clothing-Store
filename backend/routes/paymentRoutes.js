const express = require("express");
const Stripe = require("stripe");
const Checkout = require("../models/Checkout");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Initialize Stripe with secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe = null;

if (stripeSecretKey && stripeSecretKey !== "sk_test_mock") {
    try {
        stripe = Stripe(stripeSecretKey);
    } catch (e) {
        console.error("Failed to initialize Stripe:", e);
    }
}

// @route POST /api/payment/create-payment-intent
// @desc Create a Stripe Payment Intent
// @access Private
router.post("/create-payment-intent", protect, async (req, res) => {
    const { checkoutId } = req.body;

    try {
        const checkout = await Checkout.findById(checkoutId);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        // Check if we should use Mock Payment Mode
        if (!stripe) {
            console.log("Stripe Secret Key is missing or invalid. Using Mock Payment Mode.");
            return res.json({
                clientSecret: `mock_secret_${checkout._id}_${Date.now()}`,
                isMock: true
            });
        }

        const amountInCents = Math.round(checkout.totalPrice * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "usd",
            payment_method_types: ["card"],
            metadata: {
                checkoutId: checkout._id.toString(),
                userId: req.user._id.toString()
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            isMock: false
        });
    } catch (error) {
        console.error("Error creating payment intent with Stripe API:", error.message);
        console.log("Falling back to Mock Payment Mode due to Stripe API error.");
        
        // Return a mock client secret so checkout can still be tested
        res.json({
            clientSecret: `mock_secret_${checkoutId}_${Date.now()}`,
            isMock: true
        });
    }
});

module.exports = router;
