DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;

USE team_db;


CREATE TABLE department(

   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30), 
  role_id INT,
      FOREIGN KEY (role_id) REFERENCES role(id),
  manager VARCHAR(30)
);