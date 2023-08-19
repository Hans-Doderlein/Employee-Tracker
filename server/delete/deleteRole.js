const inquirer = require("inquirer");
const db = require("../dbConnection");
const { getRoleName } = require("../data/roleData");
const { getAllData } = require("../data/getData");

//gathers info on role to be deleted
async function deleteRole() {
  //retrieves existing roles
  let roles = await getRoleName();
  inquirer
    .prompt([
      {
        message: "Which role would you like to delete?",
        type: "list",
        choices: [...roles],
        name: "role",
      },
    ])
    .then((res) => {
      permDeleteRole(res);
    });
}

//deletes role frome database
function permDeleteRole(info) {
  const { role } = info;

  db.query(`delete from role where role_name = "${role}"`, (err, res) => {
    console.log(res);
    console.log(err);
  });

  //displays role table with role deleted
  getAllData("role");
}

module.exports = { deleteRole };
