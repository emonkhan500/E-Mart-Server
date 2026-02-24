const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

exports.createProduct = async (req, res) => {
  const db = await connectDB();
  const result = await db.collection("product").insertOne(req.body);
  res.send(result);
};

exports.getProducts = async (req, res) => {
  const db = await connectDB();
  const result = await db.collection("product").find().toArray();
  res.send(result);
};

exports.getProductById = async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;
  const result = await db
    .collection("product")
    .findOne({ _id: new ObjectId(id) });
  res.send(result);
};

exports.deleteProduct = async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;
  const result = await db
    .collection("product")
    .deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};