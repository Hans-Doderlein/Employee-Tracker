const inquirer = require("inquirer");
const { loadManagers, loadEmployeeID } = require("../data/employeeData");
const db = require("../dbConnection");
const { getAllData } = require("../data/getData");

//gather info on employee and new manager
async function updateManager() {
  //retrieves existing managers
  let managers = await loadManagers();

  //retrieves existing employee ids
  let employees = await loadEmployeeID();
  inquirer
    .prompt([
      {
        message: "Which employee would you like to update?",
        type: "list",
        choices: [...employees],
        name: "employeeId",
      },
      {
        message: "Who id the new manager?",
        type: "list",
        choices: [...managers, "null"],
        name: "newManager",
      },
    ])
    .then((res) => setManager(res));
}

//sets new manager in database
function setManager(info) {
  const { employeeId, newManager } = info;

  db.query(
    `update employee set manager_name = "${newManager}" where employee_id = ${employeeId}`,
    (err, res) => {
      console.log("error:", err);
      console.log("response:", res);
    }
  );

  //displays table with new manager updated
  getAllData("employee");
}

module.exports = { updateManager };
