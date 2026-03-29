import express from "express";
import {
  createPaymentIntent,
  getPaymentsByEmail,
  savePayment,
} from "../controllers/payment.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.get("/payments/:email", verifyToken, getPaymentsByEmail);
router.post("/payments", savePayment);

export default router;