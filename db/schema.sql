--deletes old database and creates fresh one
DROP DATABASE IF EXISTS restaurant_db;
CREATE DATABASE restaurant_db;

--selects database for use
USE restaurant_db;

--creates department table
CREATE TABLE department (
    department_id INT NOT NULL UNIQUE,
    department_name VARCHAR(30) not null PRIMARY KEY UNIQUE
);

--creates role table
CREATE TABLE role (
    role_name VARCHAR(30) not null PRIMARY KEY,
    role_id INT ,
    department_name VARCHAR(30) ,
    role_salary INT not null,

  

    FOREIGN KEY (department_name)
    REFERENCES department(department_name)
    on delete set null

);

--creates employee table
CREATE TABLE employee (
    employee_id int ,
    first_name VARCHAR(30) not null PRIMARY KEY,
    last_name VARCHAR(30) not null,
    role_name VARCHAR(30) ,
    department_name VARCHAR(30) ,
    role_salary INT not null,
    manager_name VARCHAR(30),

    FOREIGN KEY (role_name)
    REFERENCES role(role_name)
    on delete set null,

    FOREIGN KEY (manager_name)
    REFERENCES employee(first_name)
    on delete set null,

    FOREIGN KEY (department_name)
    REFERENCES department(department_name)
    on delete set null
    
);