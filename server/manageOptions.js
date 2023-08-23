const { depInfo } = require("./add/addDep.js");
const { addEmployee } = require("./add/addEmployee.js");
const { updateRole } = require("./update/updateEmployee.js");
const { updateManager } = require("./update/updateManager.js");
const { viewByManager } = require("./view/viewByManager.js");
const { viewByDepartment } = require("./view/viewByDepartment.js");
const { deleteRole } = require("./delete/deleteRole.js");
const { deleteDepartment } = require("./delete/deleteDepartment.js");
const { deleteEmployee } = require("./delete/deleteEmployee.js");
const { viewBudget } = require("./view/viewBudget.js");
const { getAllData } = require("./data/getData.js");
const { roleInfo } = require("./add/addRole.js");

//routes to appropriate function depending on chosen mode
function manageOptions(chosen) {
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

  let { option } = chosen;

  switch (option) {
    case options.department:
      getAllData("department");
      break;
    case options.role:
      getAllData("role");
      break;
    case options.employee:
      getAllData("employee");
      break;
    case options.addDepartment:
      depInfo();
      break;
    case options.addRole:
      roleInfo();
      break;
    case options.updateEmployee:
      updateRole();
      break;
    case options.addEmployee:
      addEmployee();
      break;
    case options.updateManager:
      updateManager();
      break;
    case options.viewByManager:
      viewByManager();
      break;
    case options.viewByDepartment:
      viewByDepartment();
      break;
    case options.deleteRole:
      deleteRole();
      break;
    case options.deleteDepartment:
      deleteDepartment();
      break;
    case options.deleteEmployee:
      deleteEmployee();
      break;
    case options.viewBudget:
      viewBudget();
      break;
    default:
      console.log("Have a Nice Day!");
      process.exit(0);
  }
}

module.exports = { manageOptions };
