const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

exports.addCart = async (req, res) => {
  const db = await connectDB();
  const cartCollection = db.collection("cartlist");

  const cartProduct = req.body;

  const alreadyExists = await cartCollection.findOne({
    userEmail: cartProduct.userEmail,
    productId: cartProduct.productId,
  });

  if (alreadyExists) {
    return res.status(409).send({ message: "Already added to cart" });
  }

  const result = await cartCollection.insertOne(cartProduct);
  res.status(201).send(result);
};

exports.getCart = async (req, res) => {
  const db = await connectDB();
  const result = await db
    .collection("cartlist")
    .find({ userEmail: req.params.userEmail })
    .toArray();

  res.send(result);
};

exports.deleteCart = async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;

  const result = await db
    .collection("cartlist")
    .deleteOne({ _id: new ObjectId(id) });

  res.send(result);
};