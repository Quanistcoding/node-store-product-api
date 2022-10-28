const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/").get(productController.getAll);
router.route("/static").get(productController.getAllStatic);

module.exports = router;