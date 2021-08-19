const tfaController = require('../controllers/tfa');

const express = require("express");
const router = express.Router();

router.post("/setup",tfaController.setup);
router.post("/verify",tfaController.verify);

module.exports = router;