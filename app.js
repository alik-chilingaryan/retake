const express = require("express");
const dotenv = require("dotenv");
const bookRoutes = require("./routes/bookRoutes.js");
const memberRoutes = require("./routes/memberRoutes.js");
const borrowRoutes = require("./routes/borrowRoutes.js");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/borrows", borrowRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
