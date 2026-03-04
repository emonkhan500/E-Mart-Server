const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

exports.generateJWT = async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: "24h",
  });
  res.send({ token });
};

exports.createUser = async (req, res) => {
  const db = await connectDB();
  const userCollection = db.collection("user");

  const user = req.body;
  const existingUser = await userCollection.findOne({ email: user.email });

  if (existingUser) {
    return res.send({ message: "user already exist" });
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
  const id = req.params.id;

  const result = await db
    .collection("user")
    .deleteOne({ _id: new ObjectId(id) });

  res.send(result);
};

exports.makeAdmin = async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;

  const result = await db.collection("user").updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "admin" } }
  );

  res.send(result);
};

// 🔹 fixed: get email from JWT, not param
exports.checkAdmin = async (req, res) => {
  const db = await connectDB();
  const email = req.decoded.email;

  const user = await db.collection("user").findOne({ email });

  res.send({ admin: user?.role === "admin" });
};
exports.getUserRole = async (req, res) => {
  try {
    const db = await connectDB();
    const email = req.params.email;

    const user = await db.collection("user").findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ role: user.role || "user" });
  } catch (error) {
    console.error("Get role error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};