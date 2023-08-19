const { loadDepNames } = require("../data/departmentData");
const { getAllData } = require("../data/getData");
const { getRoleInfo } = require("../data/roleData");
const db = require("../dbConnection");

const inquirer = require("inquirer");

//gathers info on new role
async function roleInfo() {
  //retireves exisiting role info
  let role_info = await getRoleInfo();

  //retireves existing department names
  let depName = await loadDepNames();

  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the new role title?",
        type: "input",

        //checks if role already exists
        validate: function (input) {
          if (role_info.includes(input.toLowerCase())) {
            return "Role already exists";
          }
          return true;
        },
      },
      {
        name: "id",
        message: "What is the new role ID (3-digit number)?",
        type: "number",

        //checks if id is unique and 3 digits
        validate: function (input) {
          if (input.toString().length !== 3) {
            return "Please enter a valid 3-digit number.";
          }

          if (role_info.includes(input)) {
            return "Please choose a unique ID";
          }

          return true;
        },
      },
      {
        name: "department",
        message: "To what department does this role belong?",
        type: "list",
        choices: [...depName],
      },
      {
        name: "salary",
        message: "What is the annual salary for the new role?",
        type: "number",
      },
    ])
    .then((res) => {
      addRole(res);
    });
}

//adds new role to database
function addRole(info) {
  const { title, id, department, salary } = info;
  let queryParam = [title, id, department, salary];
  db.query(
    "INSERT INTO role ( role_name, role_id, department_name , role_salary) VALUES (?,?,?,?)",
    queryParam,
    (err, res) => {
      console.log("error:", err);
      console.log("response:", res);
    }
  );

  //displays role table with new role
  getAllData("role");
}

module.exports = { roleInfo };
