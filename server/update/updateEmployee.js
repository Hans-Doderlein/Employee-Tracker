const inquirer = require("inquirer");
const { loadEmployeeID, loadRoles } = require("../data/employeeData");
const db = require("../dbConnection");
const { getAllData } = require("../data/getData");

//gathers info on employee and new role
async function updateRole() {
  //retrieves existing employee ids
  let ids = await loadEmployeeID();

  //retireves existing roles
  let roles = await loadRoles();

  inquirer
    .prompt([
      {
        message: "What is the ID of the employee you wish to update?",
        type: "list",
        choices: [...ids],
        name: "employee_id",
      },
      {
        message: "What is the new role of the employee?",
        type: "list",
        choices: [...roles],
        name: "newRole",
      },
    ])
    .then((res) => storeRole(res));
}

//stores new role in database
function storeRole(info) {
  const { employee_id, newRole } = info;

  db.query(
    `update employee set role_name = "${newRole}" where employee_id = ${employee_id}`,
    (err, res) => {
      console.log("error:", err);
      console.log("result:", res);
    }
  );

  //displays employee table with updated employee role
  getAllData("employee");
}
module.exports = { updateRole };
