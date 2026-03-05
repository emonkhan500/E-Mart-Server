const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
const productController = require("../controllers/productController");

router.post("/", verifyToken, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

router.patch("/:id", verifyToken, verifyAdmin, productController.updateProduct);

module.exports = router;