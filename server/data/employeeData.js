const db = require("../dbConnection");
const { formatResponse } = require("./departmentData");

//retrieves exitsing roles
function getRoles() {
  return new Promise((resolve, reject) => {
    db.query("SELECT role_name from role", (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

//returns and formats retrieved roles
async function loadRoles() {
  try {
    const res = await getRoles();
    const roles = formatResponse(res);
    return roles;
  } catch (e) {
    console.log(e);
  }
}

//retrieves existing managers
function getManagers() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT first_name from employee WHERE (employee_id = 109 OR employee_id = 101 OR employee_id = 201)",
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}

//formats and returns manaers
async function loadManagers() {
  try {
    const res = await getManagers();

    const managers = formatResponse(res);

    return managers;
  } catch (err) {
    console.log(err);
  }
}

//retireves existing employee ids
function getEmployeeID() {
  return new Promise((resolve, reject) => {
    db.query("select employee_id from employee", (err, res) => {
      if (err) reject(err);

      resolve(res);
    });
  });
}

//formats and returns ids
async function loadEmployeeID() {
  try {
    const res = await getEmployeeID();

    const Ids = formatResponse(res);
    return Ids;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { loadRoles, loadManagers, loadEmployeeID };
