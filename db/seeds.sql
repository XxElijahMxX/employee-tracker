-- departments --
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- emplyee roles --
INSERT INTO role (title, salary, department_id)
VALUE ("Senior Dev", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 150000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Analyst", 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Junior Dev", 70000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 125000, 4);

-- emplyee names/id --
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bronson", "Berryman", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brayden", "McDaniel", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Alex","Stankewitz",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Stacey", "Farmer", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ashley", "Melton", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lily", "Melton", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Taylor", "Vanevenhoven", 2, 7);