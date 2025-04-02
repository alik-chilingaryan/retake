const fs = require("fs");
const path = require("path");

const getData = (filename) => {
  const filePath = path.join(__dirname, `../data/${filename}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const saveData = (filename, data) => {
  fs.writeFileSync(
    path.join(__dirname, `../data/${filename}.json`),
    JSON.stringify(data, null, 2)
  );
};

module.exports = { getData, saveData };
