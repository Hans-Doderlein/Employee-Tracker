const inquirer = require("inquirer");
const { manageOptions } = require("./server/manageOptions");

//prompts for which mode is desired
function onStart() {
  const options = {
    department: "View all departments",
    role: "View all roles",
    employee: "View all employees",
    addDepartment: "Add a department",
    addRole: "Add a role",
    addEmployee: "Add an Employee",
    updateEmployee: "Update and employee role",
    updateManager: "Update an employees manager",
    viewByManager: "View all employees by manager",
    viewByDepartment: "View employees by department",
    deleteRole: "Delete a role",
    deleteEmployee: "Delete an employee",
    deleteDepartment: "Delete a department",
    viewBudget: "View total annual budget in a department",
    quit: "quit",
  };

  inquirer
    .prompt([
      {
        message: "What would you like to do?",
        name: "option",
        type: "list",
        choices: [...Object.values(options)],
      },
    ])
    .then((res) => {
      manageOptions(res);
    });
}

exports.onStart = onStart;
