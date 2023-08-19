const inquirer = require("inquirer");
const { loadDepNames } = require("../data/departmentData");
const {
  loadRoles,
  loadManagers,
  loadEmployeeID,
} = require("../data/employeeData");
const db = require("../dbConnection");
const { getAllData } = require("../data/getData");

//get info for new employee
async function addEmployee() {
  //names of existing departments
  let depName = await loadDepNames();

  //names of existing roles
  let roles = await loadRoles();

  //names of existing managers
  let managers = await loadManagers();

  //ids of existing employees
  let employeeID = await loadEmployeeID();

  inquirer
    .prompt([
      {
        message: "What is the employees first name?",
        name: "firstName",
        type: "input",
      },
      {
        name: "lastName",
        message: "What is the employees last name?",
        type: "input",
      },
      {
        name: "role",
        message: "What is the employees role?",
        type: "list",
        choices: [...roles],
      },
      {
        name: "manager",
        message: "Who is this employees manager?",
        type: "list",
        choices: [...managers, "null"],
      },
      {
        name: "id",
        message: "What is the employees ID?",
        type: "number",

        //checks new id isnt being used and is 3 digits
        validate: function (input) {
          if (input.toString().length !== 3) {
            return "Please enter a valid 3-digit number.";
          }

          if (employeeID.includes(input)) {
            return "Please select a unique ID";
          }
          return true;
        },
      },
      {
        name: "department",
        message: "What department does this employee belong to?",
        type: "list",
        choices: [...depName],
      },
      {
        name: "salary",
        message: "What is this employees salary?",
        type: "number",
      },
    ])
    .then((res) => uploadEmployee(res));
}

//adds new employee to database
function uploadEmployee(info) {
  const { firstName, lastName, role, manager, id, department, salary } = info;

  let queryParam = [id, firstName, lastName, role, department, salary, manager];

  db.query(
    `INSERT INTO employee (employee_id, first_name, last_name, role_name,department_name,role_salary, manager_name ) VALUES (?,?,?,?,?,?,?)`,
    queryParam,
    (err, res) => {
      console.log("error:", err);
      console.log("response:", res);
    }
  );

  //displays eployee table with new employee
  getAllData("employee");
}

module.exports = { addEmployee };
