const db = require("../dbConnection");

//promise to retrieve entire department table
function getDepData(tableName) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${tableName}`, (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  });
}

//returns data from a table
async function loadDepData(tableName) {
  try {
    const res = await getDepData(tableName);
    const id = formatResponse(res);

    return id;
  } catch (e) {
    console.log(e);
  }
}

//formats raw data
function formatResponse(array) {
  let currentIDS = [];
  array.forEach((object) => {
    for (let prop in object) {
      if (typeof object[prop] === "string") {
        object[prop] = object[prop].toLowerCase();
      }
    }
    currentIDS.push(...Object.values(object));
  });

  return currentIDS;
}

//formats and returns department names
async function loadDepNames() {
  try {
    const res = await getloadDepNames();
    const names = formatResponse(res);
    return names;
  } catch (e) {
    console.log(e);
  }
}

//retireve existing department names
function getloadDepNames() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT department_name FROM department`, (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  });
}
module.exports = { loadDepData, formatResponse, loadDepNames };
