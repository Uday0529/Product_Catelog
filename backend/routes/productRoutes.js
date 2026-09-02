const express = require("express");
const validateProduct = require("../middleware/validateProduct");
const authenticate = require("../middleware/auth");

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductStats
} = require("../controllers/productController");


router.post("/", authenticate, validateProduct, createProduct);

router.get("/", getAllProducts);

router.get("/stats", getProductStats);

router.get("/:id", getProductById);

router.put("/:id", authenticate, validateProduct, updateProduct);

router.delete("/:id", authenticate, deleteProduct);

module.exports = router;