const inquirer = require("inquirer");
const { loadEmployeeID } = require("../data/employeeData");
const db = require("../dbConnection");
const { getAllData } = require("../data/getData");

//gether info for epmloyee to be deleted
async function deleteEmployee() {
  //retrieves existing employee ids
  let employees = await loadEmployeeID();

  inquirer
    .prompt([
      {
        message: "Which employee would you like to delete?",
        type: "list",
        choices: [...employees],
        name: "employeeId",
      },
    ])
    .then((res) => perDelEmployee(res));
}

//deletes employee form database
function perDelEmployee(info) {
  const { employeeId } = info;

  db.query(
    `delete from employee where employee_id = "${employeeId}"`,
    (err, res) => {
      console.log(err);
      console.log(res);
    }
  );

  //displays table without deleted employee
  getAllData("employee");
}

module.exports = { deleteEmployee };
