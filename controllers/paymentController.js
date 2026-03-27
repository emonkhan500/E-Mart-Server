import Stripe from "stripe";
import { paymentCollection } from "../config/db.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔥 Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// 🔥 Get Payments by Email
export const getPaymentsByEmail = async (req, res) => {
  try {
    const query = { agentemail: req.params.email };
    const result = await paymentCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// 🔥 Save Payment
export const savePayment = async (req, res) => {
  try {
    const payment = req.body;
    const paymentResult = await paymentCollection.insertOne(payment);

    console.log("payment info", payment);

    res.send({ paymentResult });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};