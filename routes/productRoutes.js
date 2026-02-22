const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, productController.addProduct);
router.get("/", productController.getProducts);
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;