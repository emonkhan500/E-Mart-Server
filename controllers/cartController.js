const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

exports.addToCart = async (req, res) => {
  try {
    const db = await connectDB();
    const cartCollection = db.collection("cartlist");

    const cartProduct = req.body;

    const query = {
      userEmail: cartProduct.userEmail,
      productId: cartProduct.productId,
    };

    const alreadyExists = await cartCollection.findOne(query);

    if (alreadyExists) {
      return res.status(409).send({ message: "Already in cart" });
    }

    const result = await cartCollection.insertOne(cartProduct);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Cart insert failed" });
  }
};

exports.getCart = async (req, res) => {
  const db = await connectDB();
  const cartCollection = db.collection("cartlist");

  const result = await cartCollection
    .find({ userEmail: req.params.userEmail })
    .toArray();

  res.send(result);
};

exports.deleteCartItem = async (req, res) => {
  const db = await connectDB();
  const cartCollection = db.collection("cartlist");

  const result = await cartCollection.deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.send(result);
};