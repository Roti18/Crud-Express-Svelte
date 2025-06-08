// import express-validator
const { body } = require("express-validator");

// import prisma
const prisma = require("../../prisma/client");

// definisikan validasi user
const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is Invalid")
    .custom(async (value, { req }) => {
      if (!value) {
        throw new Error(" Email is required");
      }
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user && user.id !== Number(req.params.id)) {
        throw new Error("Email is laready exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 charachter long"),
];
module.exports = { validateUser };
