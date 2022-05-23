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
connect.connect(function (err) {
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
    ]).then(function (select) {
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

            case 'Add Employee':
                addEmployee();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Update Employee Role':
                updateEmployeeRole();
                break;
        }
    })
}

// if user selects view departments
function viewDepartments() {
    connect.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menuPrompt()
        })
}

// if user selects view employees
function viewEmployees() {
    connect.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menuPrompt()
        })
}

// if user selects view roles
function viewRoles() {
    connect.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menuPrompt()
        })
}

// if user wants to add a department
function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        var query = connect.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name

            },
            function (err) {
                if (err) throw err
                console.table(res);
                menuPrompt();
            }
        )
    })
}
// this creates an array for the roles that is being grabbed from role table
let rolesArray = [];
function chooseRole() {
    connect.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            rolesArray.push(res[i].title);
        }
    })
    return rolesArray;
}
// this creates an array for managers being grabbed from employee table
let managerArray = [];
function chooseManager() {
    connect.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
        function (err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                managerArray.push(res[i].first_name);
            }
        })
    return managerArray;
}

// this prompts questions to add employee
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "What is your new employee's first name?"
        },
        {
            name: 'last_name',
            type: 'input',
            message: "What is your new employee's last name?"
        },
        {
            name: 'role',
            type: 'list',
            message: "Please choose a role.",
            choices: chooseRole()
        },
        {
            name: 'choice',
            type: 'list',
            message: "What is their managers name?",
            choices: chooseManager()
        }
    ]).then(function (select) {
        let roleId = chooseRole().indexOf(select.role) + 1
        let managerId = chooseManager().indexOf(select.choice) + 1
        connect.query("INSERT INTO employee SET ?",
            {
                first_name: select.first_name,
                last_name: select.last_name,
                manager_id: managerId,
                role_id: roleId

            }, function (err) {
                if (err) throw err
                console.table(select)
                menuPrompt()
            })

    })
}

//if user selects update employee
function updateEmployeeRole() {
    connect.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err
            console.log(res)
            inquirer.prompt([
                {
                    name: 'lastName',
                    type: 'list',
                    choices: function () {
                        let lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    },
                    message: "What is your employee's last name?",
                },
                {
                    name: 'role',
                    type: 'list',
                    message: "What is your employee's new role?",
                    choices: chooseRole()
                },
            ]).then(function (select) {
                let roleId = chooseRole().indexOf(select.role) + 1
                connect.query("UPDATE employee SET WHERE ?",
                    {
                        last_name: select.lastName

                    },
                    {
                        role_id: roleId

                    },
                    function (err) {
                        if (err) throw err
                        console.table(select)
                        menuPrompt()
                    })

            });
        });

}

// if user selects add new role
function addRole() {
    connect.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"

            }
        ]).then(function (res) {
            connect.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    menuPrompt();
                }
            )

        });
    });
}