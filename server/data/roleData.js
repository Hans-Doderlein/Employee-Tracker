const { formatResponse } = require("./departmentData");
const db = require("../dbConnection");

//retireves info of existing roles and ids
function getRoleData() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT role_name, role_id FROM role`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

//returns formatted roles and ids
async function getRoleInfo() {
  try {
    const res = await getRoleData();

    const role_info = formatResponse(res);

    return role_info;
  } catch (e) {
    console.log(e);
  }
}

//retireves only role name
async function getRoleName() {
  try {
    const res = await loadRoleNames();
    const roles = formatResponse(res);
    return roles;
  } catch (e) {
    console.log(err);
  }
}

//formats and return role names
function loadRoleNames() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT role_name FROM role`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

module.exports = { getRoleInfo, getRoleName };
