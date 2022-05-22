const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'employee_trackerDB'
});

// connection
connect.connect(function(err) {
    if (err) throw err
    console.log('Connected as Id' + connect.threadId)
    menuPrompt();
});

// menu prompts
function menuPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: "Welcome to the Employee Tracker, please select an option from this list!",
            name: 'choice',
            choices: [
                'View Departments',
                'View Employees',
                'View Roles',
                'Add Department',
                'Add Employee',
                'Add Role',
                'Update Employee Role'
            ]
        }
    ]).then(function(select) {
        switch (select.choice) {
            case 'View Departments':
                viewDepartments();
                break;

                case 'View Employees':
                    viewEmployees();
                    break;

                    case 'View Roles':
                        viewRoles();
                        break;

                        case 'Add Department':
                            addDepartment();
                            break;

                            case 'Add Employees':
                                addEmployees();
                                break;

                                case 'Add Roles':
                                    addRoles();
                                    break;

                                    case 'Update Employee Role':
                                        updateEmployeeRole();
                                        break;
        }
    })
}
