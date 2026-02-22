const connectDB = require("../config/db");

const verifyAdmin = async (req, res, next) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("user");

    const email = req.decoded.email;

    const user = await userCollection.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(403).send({ message: "Admin access required" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Admin verification failed" });
  }
};

module.exports = verifyAdmin;