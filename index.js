//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                                     TEAM-AG DESIGNS                                    
/*==========================================================================================
                          EMPLOYEE TASK MANAGER OPERATIONS
I created a Schema within MySQL database, established seed values while establish a connection.
Developed a user-friendly application that allows to but not limited to add/remove/view/update.
            Operations can easily Nav. through the command terminal, 
          To modify and create "Departments, roles, employees management"
      Terminal Command will give access to update the MYSQL to Generate a database
=========================================================================================*/


/*===============================================================================
                            Dependencies
================================================================================*/
const {
  prompt
} = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require('console.table');
const Choices = require("inquirer/lib/objects/choices");
//const Questions = require('./lib/questions');
//const questions = new Questions();
/*===============================================================================
            Chalk NPM Package to print colorful  messages
                https: //www.npmjs.com/package/chalk
          Chalk comes with an easy to use composable API 
          where you just chain and nest the styles you want.
================================================================================*/
const chalk = require('chalk');

// const { updateEmployeeRole, updateEmployeeManager, removeDepartment, removeRole } = require("./db");

init();

/*===============================================================================
                          DISPLAY LOGO
                          LOAD PROMPTS
================================================================================*/
function init() {
  const logoText = logo({
    name: "Employee Manager"
  }).render();
  console.log(chalk.greenBright.bold(`

    _     _   _    ____    ____   U _____ u                    ____     _   _   _   _     _____ U _____ u   ____     
U  /"\  u| \ |"|  |  _"\U |  _"\ u\| ___"|/__        __     U /"___|uU |"|u| | | \ |"|   |_ " _|\| ___"|/U |  _"\ u  
 \/ _ \/<|  \| |>/| | | |\| |_) |/ |  _|"  \"\      /"/     \| |  _ / \| |\| |<|  \| |>    | |   |  _|"   \| |_) |/  
 / ___ \U| |\  |uU| |_| |\|  _ <   | |___  /\ \ /\ / /\      | |_| |   | |_| |U| |\  |u   /| |\  | |___    |  _ <    
/_/   \_\|_| \_|  |____/ u|_| \_\  |_____|U  \ V  V /  U      \____|  <<\___/  |_| \_|   u |_|U  |_____|   |_| \_\   
 \\    >>||   \\,-.|||_   //   \\_ <<   >>.-,_\ /\ /_,-.      _)(|_  (__) )(   ||   \\,-._// \\_ <<   >>   //   \\_  
(__)  (__|_")  (_/(__)_) (__)  (__|__) (__)\_)-'  '-(_/      (__)__)     (__)  (_")  (_/(__) (__|__) (__) (__)  (__) 

  `));
  startPrompt();
}
/*===============================================================================

                        MAIN PROMPTS
                            
================================================================================*/
async function startPrompt() {
  const { choice } = await prompt([{
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      /*===============================================================================

                              VIEW ALL
                                  
      ================================================================================*/
      {
        name: "View All Employees",
        value: "VIEW_EMPLOYEES"
      },
      {
        name: "View All Employees By Department",
        value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
      },
      {
        name: "View All Employees By Manager",
        value: "VIEW_EMPLOYEES_BY_MANAGER"
      },
      /*===============================================================================

                              EMPLOYEE
                                  
      ================================================================================*/
      {
        name: "Add Employee",
        value: "ADD_EMPLOYEE"
      },
      {
        name: "Remove Employee",
        value: "REMOVE_EMPLOYEE"
      },
      /*===============================================================================

                              UPDATE EMPLOYEE
                                  
      ================================================================================*/
      {
        name: "Update Employee Role",
        value: "UPDATE_EMPLOYEE_ROLE"
      }, {
        name: "Update Employee Manager",
        value: "UPDATE_EMPLOYEE_MANAGER"
      },
      /*===============================================================================

                                ROLES
                                  
      ================================================================================*/
      {
        name: "View All Roles",
        value: "VIEW_ROLES"
      }, {
        name: "Add Role",
        value: "ADD_ROLE"
      }, {
        name: "Remove Role",
        value: "REMOVE_ROLE"
      },
      /*===============================================================================

                                DEPARTMENTS
                                  
      ================================================================================*/
      {
        name: "View All Departments",
        value: "VIEW_DEPARTMENTS"
      },
      {
        name: "Add Department",
        value: "ADD_DEPARTMENT"
      },
      {
        name: "Remove Department",
        value: "REMOVE_DEPARTMENT"
      },
      /*===============================================================================

                              QUIT
                                  
      ================================================================================*/
      {
        name: "Quit",
        value: "QUIT"
      }
    ]
  }]);
  /*===============================================================================

                          CALL FUNCTION ON CHOICES
                              
  ================================================================================*/
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "REMOVE_DEPARTMENT":
      return removeDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return removeRole();
    default:
      return quit();
  }
}
/*===============================================================================

                          VIEW EMPLOYEE
                            
================================================================================*/
async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);
  startPrompt();
}
/*===============================================================================

                        UPDATE EMPLOYEE BY DEPARTMENT
                            
================================================================================*/
async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(function ({
    id,
    name
  }) {
    return ({
      name: name,
      value: id
    });
  });
  const {
    departmentId
  } = await prompt([{
    type: "list",
    name: "departmentId",
    message: "Which department would you like to see employees for?",
    choices: departmentChoices
  }]);
  const employees = await db.findAllEmployeesByDepartment(departmentId);
  console.log("\n");
  console.table(employees);
  startPrompt();
}
/*===============================================================================

                          VIEW EMPLOYEE BY MANAGER
                            
================================================================================*/
async function viewEmployeesByManager() {
  const managers = await db.findAllEmployees();
  const managerChoices = managers.map(function ({
    id,
    first_name,
    last_name
  }) {
    return ({
      name: `${first_name} ${last_name}`,
      value: id
    });
  });
  const {
    managerId
  } = await prompt([{
    type: "list",
    name: "managerId",
    message: "Which employee do you want to see direct reports for?",
    choices: managerChoices
  }]);
  const employees = await db.findAllEmployeesByManager(managerId);
  console.log("\n");
  if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
  } else {
    console.table(employees);
  }
  startPrompt();
}
/*===============================================================================

                            REMOVE EMPLOYEE
                            
================================================================================*/
async function removeEmployee() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(function ({
    id,
    first_name,
    last_name
  }) {
    return ({
      name: `${first_name} ${last_name}`,
      value: id
    });
  });
  const {
    employeeId
  } = await prompt([{
    type: "list",
    name: "employeeId",
    message: "Which employee do you want to remove?",
    choices: employeeChoices
  }]);
  await db.removeEmployee(employeeId);
  console.log("Removed employee from the database");
  startPrompt();
}
/*===============================================================================

                          UPDATE EMPLOYEE ROLE
                            
================================================================================*/
async function updateEmployeeRole() {
  const employees = await db.findAllEmployees()
  const employeeChoices = employees.map(function ({
    id,
    first_name,
    last_name
  }) {
    return ({
      name: `${first_name} ${last_name}`,
      value: id
    });
  });
  const {
    employeeId
  } = await prompt([{
    type: "list",
    name: "employeeId",
    message: "Which employee's role do you want to update?",
    choices: employeeChoices
  }]);
  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({
    id,
    title
  }) => ({
    name: title,
    value: id
  }));
  const {
    roleId
  } = await prompt([{
    type: "list",
    name: "roleId",
    message: "which role do you ant to assign to selected employee?",
    choices: roleChoices
  }]);
  await db.updateEmployeeRole(employeeId, roleId);
  console.log("Updated employee's role");
  startPrompt();
};
/*===============================================================================

                          UPDATE EMPLOYEE MANAGER
                            
================================================================================*/
async function updateEmployeeManager() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  const {
    employeeId
  } = await prompt([{
    type: "list",
    name: "employeeId",
    message: "which employee's manager do you want to update?",
    choices: employeeChoices
  }]);
  const managers = await db.findAllPossibleManagers(employeeId);
  const managerChoices = managers.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  const {
    managerId
  } = await prompt([{
    type: "list",
    name: "managerId",
    message: "which employee do you want to set as manager for the sleeted employee?",
    choices: managerChoices
  }]);
  await db.updateEmployeeManager(employeeId, managerId);
  console.log("Updated employee's manager");
  startPrompt();
}
/*===============================================================================

                              VIEW ROLES
                            
================================================================================*/
async function viewRoles() {
  const roles = await db.findAllRoles();
  console.log("\n");
  console.table(roles);
  startPrompt();
}
/*===============================================================================

                            ADD ROLES
                            
================================================================================*/
async function addRole() {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(({
    id,
    name
  }) => ({
    name: name,
    value: id,
  }));
  const role = await prompt([{
      name: "title",
      message: "what is the name of the role?"
    },
    {
      name: "salary",
      message: "what is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await db.createRole(role);
  console.log(`Added ${role.title} to the database`);
  startPrompt();
}
/*===============================================================================

                          REMOVE ROLE
                            
================================================================================*/
async function removeRole() {
  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({
    id,
    title
  }) => ({
    name: title,
    value: id,
  }));
  const {
    roleId
  } = await prompt([{
    type: "list",
    name: "roleId",
    message: "Which role do you want to remove? (Warning: This will also remove employees",
    choices: roleChoices
  }]);
  await db.removeRole(roleId);
  console.log("Removed role from the database");
  startPrompt();
}
/*===============================================================================

                          VIEW DEPARTMENTS
                            
================================================================================*/
async function viewDepartments() {
  const departments = await db.findAllDepartments();
  console.log("\n");
  console.table(departments);
  startPrompt();
}
/*===============================================================================

                          ADD DEPARTMENT

================================================================================*/
async function addDepartment() {
  const department = await prompt([{
    name: "name",
    message: "What is the name of the department?"
  }]);
  await db.createDepartment(department);
  console.log(`Added ${department.name} to the database`);
  startPrompt();
}
/*===============================================================================

                          REMOVE DEPARTMENT
================================================================================*/
async function removeDepartment() {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(({
    id,
    name
  }) => ({
    name: name,
    value: id
  }));
  const {
    departmentId
  } = await prompt({
    type: "list",
    name: "departmentId",
    message: "Which department would you like to remove?(Warning: This will also remove associated roles and employees)",
    choices: departmentChoices
  });
  await db.removeDepartment(departmentId);
  console.log(`Remove department from the database`);
  startPrompt();
}
/*===============================================================================

                          ADD EMPLOYEE
================================================================================*/
async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([{
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);
  /*===============================================================================

                            ROLE CHOICES

  ================================================================================*/
  const roleChoices = roles.map(({
    id,
    title
  }) => ({
    name: title,
    value: id
  }));

  const {
    roleId
  } = await prompt({
    type: "list",
    name: "roleId",
    message: "what is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;
  /*===============================================================================

                          MANAGER CHOICES

  ================================================================================*/
  const managerChoices = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({
    name: "None",
    value: null
  });

  const {
    managerId
  } = await prompt({
    type: "list",
    name: "manager",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });
  employee.manager_id = managerId;
  await db.createEmployee(employee);
  console.log(`Added ${employee.first_name} ${employee.last_name} to the database`);
  startPrompt();
}
/*===============================================================================

                        QUIT FUNCTION

================================================================================*/
function quit() {
  console.log("Goodbye!");
  process.exit();
}