const inquirer = require("inquirer");
const { loadDepNames } = require("../data/departmentData");
const db = require("../dbConnection");
//gathers info on which department you want to view the budget for
async function viewBudget() {
  //retrieves department names
  let depNames = await loadDepNames();

  inquirer
    .prompt([
      {
        message:
          "For which department would you like to view the annual budget?",
        type: "list",
        choices: [...depNames],
        name: "department",
      },
    ])
    .then((res) => {
      getBudget(res);
    });
}

//calculates total annual budget
function getBudget(info) {
  const { department } = info;

  db.query(
    `select department_name, sum(role_salary) as annual_budget from employee where department_name = "${department}" group by department_name`,
    (err, res) => {
      let formattedResult = res.map((row) => {
        const { __index, ...formattedRow } = row;
        return formattedRow;
      });

      //displays table with formatted budget
      console.clear();
      console.table(formattedResult);
    }
  );
}

module.exports = { viewBudget };
