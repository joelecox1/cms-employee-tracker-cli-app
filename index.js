const { prompt } = require('inquirer');
const { listenerCount } = require('mysql2/typings/mysql/lib/Pool');
const { createRole, updateEmployeeManager, findAllDepartments, createDepartment, removeDepartment, findAllEmployeesByDept } = require('./db');
const db = require('./db');
require('console.table');

loadPrompts();

async function loadPrompts() {
  const { choice } = await prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View all employees',
          value: 'VIEW_EMPLOYEES',
        },
        {
          name: 'View all employees by department',
          value: 'VIEW_EMPLOYEES_DEPT'
        },
        {
          name: 'View all employees by manager',
          value: 'VIEW_EMPLOYEE_MANAGER'
        },
        {
          name: 'Add new employee',
          value: 'ADD_EMPLOYEE'
        },
        {
          name: 'Remove employee',
          value: 'REMOVE_EMPLOYEE'
        },
        {
          name: 'Update employee role',
          value: 'UPDATE_ROLE'
        },
        {
          name: 'Update employee manager',
          value: 'UPDATE_MANAGER'
        },
        {
          name: 'Find all roles',
          value: 'FIND_ROLES'
        },
        {
          name: 'Create new role',
          value: 'CREATE_ROLE'
        },
        {
          name: 'Remove role',
          value: 'REMOVE_ROLE'
        },
        {
          name: 'Find all departments',
          value: 'ALL_DEPTS'
        },
        {
          name: 'Create new department',
          value: 'CREATE_DEPT'
        },
        {
          name: 'Remove department',
          value: 'REMOVE_DEPT'
        },
        {
          name: 'Quit',
          value: 'QUIT'
        }
      ]
    }
  ]);
};