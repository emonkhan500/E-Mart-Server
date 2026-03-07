const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/categoryRoute");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-mart-724d0.web.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/product", productRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/cart", cartRoutes);
app.use("/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("E-Mart Server is Running");
});

module.exports = app;