const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-mart-724d0.web.app"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/users", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/wishlist", require("./routes/wishlistRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

app.get("/", (req, res) => {
  res.send("E-Mart Server Running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});