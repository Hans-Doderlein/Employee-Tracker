const inquirer = require("inquirer");
const db = require("../dbConnection");
const { loadManagers } = require("../data/employeeData");
//gather info on which managers employees you wish to view
async function viewByManager() {
  //retrieves existing managers
  let managers = await loadManagers();
  inquirer
    .prompt([
      {
        message: "For which manager do you want to view the employees?",
        type: "list",
        choices: [...managers, "null"],
        name: "manager",
      },
    ])
    .then((res) => {
      viewEmployees(res);
    });
}

//queries for all employees with that manager
function viewEmployees(info) {
  const { manager } = info;

  db.query(
    `select * from employee where manager_name = "${manager}"`,
    (err, res) => {
      let formattedResult = res.map((row) => {
        const { __index, ...formattedRow } = row;
        return formattedRow;
      });

      //logs table of employees
      console.clear();
      console.table(formattedResult);
    }
  );
}

module.exports = { viewByManager };
