const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

exports.addWishlist = async (req, res) => {
  const db = await connectDB();
  const wishCollection = db.collection("wishlist");

  const wishProduct = req.body;

  const alreadyExists = await wishCollection.findOne({
    userEmail: wishProduct.userEmail,
    productId: wishProduct.productId,
  });

  if (alreadyExists) {
    return res.status(409).send({ message: "Already added to wishlist" });
  }

  const result = await wishCollection.insertOne(wishProduct);
  res.send(result);
};

exports.getWishlist = async (req, res) => {
  const db = await connectDB();
  const result = await db
    .collection("wishlist")
    .find({ userEmail: req.params.userEmail })
    .toArray();

  res.send(result);
};

exports.deleteWishlist = async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;

  const result = await db
    .collection("wishlist")
    .deleteOne({ _id: new ObjectId(id) });

  res.send(result);
};