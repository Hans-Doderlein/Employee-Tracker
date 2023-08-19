const inquirer = require("inquirer");
const { loadDepNames } = require("../data/departmentData");
const db = require("../dbConnection");
const { getAllData } = require("../data/getData");

//gathers info on department ot be deleted
async function deleteDepartment() {
  //retrieves all exisitng departments
  let departmentNames = await loadDepNames();

  inquirer
    .prompt([
      {
        message: "Which department would you like to delete?",
        type: "list",
        choices: [...departmentNames],
        name: "depName",
      },
    ])
    .then((res) => perDelDep(res));
}

//deletes department from database
function perDelDep(info) {
  const { depName } = info;

  db.query(
    `delete from department where department_name = "${depName}"`,
    (err, res) => {
      console.log(err);
      console.log(res);
    }
  );

  //display department table without deleted department
  getAllData("department");
}

module.exports = { deleteDepartment };
