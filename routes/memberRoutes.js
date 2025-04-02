const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  createMember,
  updateMember,
  getMemberBorrows,
  loginMember,
  logoutMember,
} = require("../controllers/memberController");
const protected = require("../middlewares/protected");

router.get("/", getAllMembers);
router.post("/", createMember);
router.put("/:id", updateMember);
router.get("/:id/borrows", protected, getMemberBorrows);
router.post("/login", loginMember);
router.post("/logout", protected, logoutMember);

module.exports = router;
