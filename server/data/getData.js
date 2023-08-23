const promptUser = require("../../promptUser");
const db = require("../dbConnection");
const cTable = require("console.table");

// returns formatted table
function getAllData(tableName) {
  db.query(`SELECT * FROM ${tableName}`, (err, res) => {
    let formattedResult = res.map((row) => {
      const { __index, ...formattedRow } = row;
      return formattedRow;
    });

    console.clear();
    console.table(formattedResult);
    promptUser.onStart();
  });
}
module.exports = { getAllData };
