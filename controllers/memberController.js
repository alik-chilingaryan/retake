const { getData, saveData } = require("../utils/fileHelper");

const getAllMembers = (req, res) => {
  const members = getData("members");
  res.json(members);
};

const createMember = (req, res) => {
  const members = getData("members");
  const {
    name,
    password,
    email = "example@example.com",
    phone = "Number",
  } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  const newMember = {
    id: members.length + 1,
    name,
    password,
    email,
    phone,
  };

  members.push(newMember);
  saveData("members", members);
  res.status(201).json(newMember);
};

const updateMember = (req, res) => {
  const members = getData("members");
  const memberIndex = members.findIndex((m) => m.id === req.params.id);
  if (memberIndex === -1) {
    return res.status(404).json({ message: "Member not found" });
  }

  members[memberIndex] = { ...members[memberIndex], ...req.body };
  saveData("members", members);
  res.json(members[memberIndex]);
};

const getMemberBorrows = (req, res) => {
  const borrows = getData("borrows");
  const memberBorrows = borrows.filter((b) => b.memberId === req.params.id);
  res.json(memberBorrows);
};

const loginMember = (req, res) => {
  const { name, password } = req.body;
  const members = getData("members");
  const sessions = getData("sessions");

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  const member = members.find(
    (m) => m.name === name && m.password === password
  );
  if (!member) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = Math.random().toString() + Date.now().toString();
  sessions.push({ token, memberId: member.id });
  saveData("sessions", sessions);

  res.json({ token, memberId: member.id });
};

const logoutMember = (req, res) => {
  const { token } = req.body;
  const sessions = getData("sessions");

  const sessionIndex = sessions.findIndex((s) => s.token === token);

  sessions.splice(sessionIndex, 1);
  saveData("sessions", sessions);

  res.json({ message: "Logged out successfully" });
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  getMemberBorrows,
  loginMember,
  logoutMember,
};
