const express = require("express");
const { test, test2 } = require("../Controllers/testController");

const router = express.Router();


router.post("/test", test);
router.post("/test2", test2);

module.exports = router;