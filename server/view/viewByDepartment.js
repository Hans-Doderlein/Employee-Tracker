const inquirer = require("inquirer");
const { loadDepNames } = require("../data/departmentData");
const db = require("../dbConnection");

//gather info on department you wish to view
async function viewByDepartment() {
  //retrieves all departments that exist
  let departments = await loadDepNames();
  inquirer
    .prompt([
      {
        message: "For which department would you like to view employees?",
        type: "list",
        choices: [...departments],
        name: "department",
      },
    ])
    .then((res) => showByDepartment(res));
}

//Shows all employees in selcted department
function showByDepartment(info) {
  const { department } = info;

  db.query(
    `select * from employee where department_name = "${department}"`,
    (err, res) => {
      let formattedResult = res.map((row) => {
        const { __index, ...formattedRow } = row;
        return formattedRow;
      });

      //logs table of employees in department
      console.clear();
      console.table(formattedResult);
    }
  );
}

module.exports = { viewByDepartment };
