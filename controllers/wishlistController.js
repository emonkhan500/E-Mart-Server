const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

exports.addToWishlist = async (req, res) => {
  try {
    const db = await connectDB();
    const wishCollection = db.collection("wishlist");

    const wishProduct = req.body;

    const query = {
      userEmail: wishProduct.userEmail,
      productId: wishProduct.productId,
    };

    const alreadyExists = await wishCollection.findOne(query);

    if (alreadyExists) {
      return res.status(409).send({ message: "Already in wishlist" });
    }

    const result = await wishCollection.insertOne(wishProduct);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Wishlist insert failed" });
  }
};

exports.getWishlist = async (req, res) => {
  const db = await connectDB();
  const wishCollection = db.collection("wishlist");

  const result = await wishCollection
    .find({ userEmail: req.params.userEmail })
    .toArray();

  res.send(result);
};

exports.deleteWishlistItem = async (req, res) => {
  const db = await connectDB();
  const wishCollection = db.collection("wishlist");

  const result = await wishCollection.deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.send(result);
};