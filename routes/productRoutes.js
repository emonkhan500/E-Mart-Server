const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const productController = require("../controllers/productController");

router.post("/", verifyToken, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

module.exports = router;