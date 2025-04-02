const { getData } = require("../utils/fileHelper");

const protected = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "You are missing token" });
  }

  const sessions = getData("sessions");
  const session = sessions.find((s) => s.token === token);
  if (!session) {
    return res.status(401).json({ message: "It is invalid token" });
  }

  next();
};

module.exports = protected;
