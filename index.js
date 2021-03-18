const { prompt } = require('inquirer');
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
  switch (choice) {
    case 'VIEW_EMPLOYEES':
      return findAllEmployees();
    case 'VIEW_EMPLOYEES_DEPT':
      return findAllEmployeesByDept();
    case 'VIEW_EMPLOYEE_MANAGER':
      return findAllEmployeesByManager();
    case 'ADD_EMPLOYEE':
      return createEmployee();
    case 'REMOVE_EMPLOYEE':
      return removeEmployee();
    case 'UPDATE_ROLE':
      return updateEmployeeRole();
    case 'UPDATE_MANAGER':
      return updateEmployeeManager();
    case 'FIND_ROLES':
      return findAllRoles();
    case 'CREATE_ROLE':
      return createRole();
    case 'REMOVE_ROLE':
      return removeRole();
    case 'ALL_DEPTS':
      return findAllDepartments();
    case 'CREATE_DEPT':
      return createDepartment();
    case 'REMOVE_DEPT':
      return removeDepartment();
    case 'QUIT':
      return quit();
  }
};

async function findAllEmployees() {
  const employees = await db.findAllEmployees();

  console.log('\n');
  console.table(employees);

  loadPrompts();
};

async function findAllEmployeesByDept() {
  const departments = await db.findAllEmployeesByDept();
  const deptChoices = departments.map(({ id, name }) => ({
    name: name, 
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: 'list',
      name: 'departmentId',
      message: "Which department's employees would you like to see?",
      choices: deptChoices
    }
  ]);

  const employees = await db.findAllEmployeesByDept(departmentId);

  console.log('\n');
  console.table(employees);

  loadPrompts();
};

async function findAllEmployeesByManager() {
  const managers = await db.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: 'list',
      name: 'managerId',
      message: "Which employee do you want to view?",
      choices: managerChoices
    }
  ]);

  const employees = db.findAllEmployeesByManager(managerId);

  console.log('\n');
  if(employees.length === 0) {
    console.log('No employees to display.')
  } else {
    console.table(employees);
  }

  loadPrompts();
};

async function createEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();
  
  const employee = await prompt([
    {
      name: 'first_name',
      message: "What is employee's first name?"
    },
    {
      name: 'last_name',
      message: "What is employee's last name?"
    }
  ]);

  const roleChoices = role.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: 'list',
      name: 'roleId',
      message: "What is employee's role?",
      choices: roleChoices
    }
  ]);

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  managerChoices.unshift({ name: 'none', value: null });

  const { managerId } = await prompt(
    {
      type: 'list',
      name: 'managerId',
      message: "What is the employee's manager's name?",
      choices: managerChoices
    }
  );

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(`Added ${employee.first_name} ${employee.last_name} to the database.`);

  loadPrompts();
};

async function removeEmployee() {
  const employees =  await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee will be deleted?',
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log(`${first_name} ${last_name} has been removed from the database.`);

  loadPrompts();
};

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  
  const { employeeId } = await prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee role will be updated?',
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    id: id
  }));

  const { roleId } = await prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'What is the new role?',
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(roleId, employeeId);

  console.log(`${first_name} ${last_name}'s role has been updated.`);

  loadPrompts();
};

async function updateEmployeeManager() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  
  const { employeeId } = await prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: "Which employee's manager will be updated?",
      choices: employeeChoices
    }
  ]);

  const managers = await db.findAllPossibleManagers(employeeId);

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    id: id
  }));

  const { managerId } = await prompt([
    {
      type: 'list',
      name: 'managerId',
      message: 'Who is the new manager?',
      choices: managerChoices
    }
  ]);

  await db.updateEmployeeManager(managerId, employeeId);

  console.log(`Employee's manager has been updated.`);

  loadPrompts();
};

async function findAllRoles() {
  const roles = await db.findAllRoles();

  console.log('\n');
  console.table(roles);

  loadPrompts();
};

async function createRole() {
  const depts = await db.findAllDepartments();

  const deptChoices = depts.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: 'title',
      message: 'What role will be created?',
    },
    {
      name: 'salary',
      message: 'What is the salary for this role?'      
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'What department does this role belong to?',
      choices: deptChoices
    }
  ])

  await db.createRole(role);

  console.log('\n');
  console.log('New role was created!');

  loadPrompts();
};

async function removeRole() {
  const roles =  await db.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Which role will be deleted? WARNING: REMOVING A ROLE WILL REMOVE ALL EMPLOYEES ASSOCIATED WITH THAT ROLE',
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);

  console.log(`Role has been removed from the database.`);

  loadPrompts();
};

async function findAllDepartments() {
  const departments = await db.findAllDepartments();

  console.log('\n');
  console.table(departments);

  loadPrompts();
};

async function createDepartment() {
  const department = await prompt ([
    {
      name: 'name',
      message: 'What is the name of the new department?'
    }
  ]);

  await db.createDepartment(department);

  console.log('New department was created.');

  loadPrompts();
};

async function removeDepartment() {
  const depts =  await db.findAllDepartments();
  const deptChoices = depts.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { deptId } = await prompt([
    {
      type: 'list',
      name: 'deptId',
      message: 'Which department will be deleted? WARNING: REMOVING A DEPARTMENT WILL REMOVE ALL EMPLOYEES & ROLES ASSOCIATED WITH THAT DEPARTMENT',
      choices: deptChoices
    }
  ]);

  await db.removeDepartment(deptId);

  console.log(`Department has been removed from the database.`);

  loadPrompts();
};

function quit() {
  console.log('Goodbye! :)')

  process.exit();
};