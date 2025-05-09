const express = require("express");
const loansController = require("../controllers/loans.controllers");
const router = express.Router();

router.post("/", loansController.loanBookToMember);

module.exports = router;
