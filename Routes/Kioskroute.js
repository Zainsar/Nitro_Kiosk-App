const express = require("express");
const { verifytokenKiosk } = require("../Middleware/verifyToken.js");
const loginkiosk = require("../Controllers/kioskController.js");

const router = express.Router();

router.post("/loginKiosk", loginkiosk);

module.exports = router;