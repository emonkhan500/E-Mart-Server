const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

exports.createUser = async (req, res) => {
  const db = await connectDB();
  const userCollection = db.collection("user");

  const user = req.body;
  const existing = await userCollection.findOne({ email: user.email });

  if (existing) {
    return res.send({ message: "User already exists" });
  }

  const result = await userCollection.insertOne(user);
  res.send(result);
};

exports.getUsers = async (req, res) => {
  const db = await connectDB();
  const users = await db.collection("user").find().toArray();
  res.send(users);
};

exports.deleteUser = async (req, res) => {
  const db = await connectDB();
  const result = await db
    .collection("user")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  res.send(result);
};