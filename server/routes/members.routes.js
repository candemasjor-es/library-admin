const express = require("express");
const membersController = require("../controllers/members.controllers");
const router = express.Router();

router.post("/", membersController.createMember);

module.exports = router;
