const db = require("../dbConnection");

const inquirer = require("inquirer");
const { loadDepData } = require("../data/departmentData");
const { getAllData } = require("../data/getData");

//gets IDS for departments
async function myIDS(tableName) {
  let depID = await loadDepData(tableName);
  return depID;
}

//adds department to table
async function depInfo() {
  let depID = await myIDS("department");

  inquirer
    .prompt([
      {
        name: "depName",
        message: "What is the name of the Department?",
        type: "input",

        //checks if department already exists
        validate: function (input) {
          if (depID.includes(input.toLowerCase())) {
            return "Department already exists";
          }
          return true;
        },
      },
      {
        name: "depID",
        message: "What is the id of the Department (3 digit number)?",
        type: "number",

        //checks that id is not already in use, and 3 digits long
        validate: function (input) {
          if (input.toString().length !== 3) {
            return "Please enter a valid 3-digit number.";
          }

          if (depID.includes(input)) {
            return "Please choose a unique ID";
          }

          return true;
        },
      },
    ])
    .then((res) => {
      addDepartment(res);
    });
}

//adds department to database
function addDepartment(info) {
  const { depName, depID } = info;

  db.query(
    `INSERT INTO department ( department_id, department_name) VALUES (?,?)`,
    [depID, depName],
    (err, res) => {
      console.log("error:", err);
    }
  );

  //displays departments table
  getAllData("department");
}

module.exports = { depInfo };
