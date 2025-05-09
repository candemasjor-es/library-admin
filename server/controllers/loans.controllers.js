const LOAN_DAYS = 30;
const { Op } = require("sequelize");

const Loan = require("../models/Loan");
const Book = require("../models/Book");
const Member = require("../models/Member");

const loanBookToMember = async (req, res) => {
  const memberId = req.body.memberId;
  const bookId = req.body.bookId;

  const foundBook = await Book.findByPk(bookId);
  if (!foundBook) {
    return res.status(404).send("Book not found");
  }

  const foundMember = await Member.findByPk(memberId);
  if (!foundMember) {
    return res.status(404).send("Member not found");
  }

  const currentDate = new Date();
  const calcuatedDeadline = new Date(
    currentDate.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000
  );

  const createdLoan = await Loan.create({
    loanDate: new Date(),
    deadline: calcuatedDeadline,
    BookId: bookId,
    MemberId: memberId,
  });
  res.status(201).send({ deadline: createdLoan.deadline });
};
const returnBook = async (req, res) => {
  const bookId = req.body.bookId;
  const returnLoan = await Loan.update(
    {
      returnDate: new Date(),
    },
    {
      where: {
        bookId: bookId,
        returnDate: null,
      },
    }
  );
  res.send({ cancelLoans: returnLoan[0] });
};

const getLoan = async (req, res) => {
  const memberId = req.query.memberId;
  const activeLoans = req.query.activeLoans;

  const whereCondition = {
    MemberId: memberId,
  };

  if (activeLoans === "true") {
    whereCondition.returnDate = null;
  }

  if (activeLoans === "false") {
    whereCondition.returnDate = {
      [Op.not]: null,
    };
  }

  const loans = await Loan.findAll({
    where: whereCondition,
    include: [
      {
        model: Book,
        attributes: ["title"],
      },
    ],
  });

  const response = loans.map((loan) => ({
    returnDate: loan.returnDate,
    loanDate: loan.loanDate,
    deadline: loan.deadline,
    bookTitle: loan.Book.title,
  }));

  res.send({ loans: response });
};

exports.loanBookToMember = loanBookToMember;
exports.returnBook = returnBook;
exports.getLoan = getLoan;
