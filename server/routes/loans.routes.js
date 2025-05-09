const express = require("express");
const loansController = require("../controllers/loans.controllers");
const router = express.Router();

router.post("/", loansController.loanBookToMember);
router.patch("/", loansController.returnBook);
router.get("/", loansController.getLoan);

module.exports = router;
