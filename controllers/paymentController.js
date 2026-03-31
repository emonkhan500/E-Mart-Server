const Stripe = require("stripe");
const connectDB = require("../config/db");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//  Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
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

//  Get Payments by Email
exports.getPaymentsByEmail = async (req, res) => {
  try {
    const db = await connectDB();
    
    const query = { agentemail: req.params.email };
    const result = await  db.collection("payment").find(query).toArray(); 
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//  Save Payment
exports.savePayment = async (req, res) => {
  try {
    const db = await connectDB();
    const paymentCollection = db.collection("payment");
    const payment = req.body;
    const paymentResult = await paymentCollection.insertOne(payment);

    console.log("payment info", payment);

    res.send({ paymentResult });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};