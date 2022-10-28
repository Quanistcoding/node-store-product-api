const express = require("express");
const router = express.Router();
const serveHomePAge = require("../controllers/serveHomePage");

router.route("/").get(serveHomePAge);

module.exports = router;