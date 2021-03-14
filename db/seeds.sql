INSERT INTO department (name)
VALUES
  ('Development'),
  ('Management'),
  ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Lead Software Engineer', 100000, 1),
  ('Junior Software Engineer', 80000, 1),
  ('Office Manager', 100000, 2),
  ('Lead Accountant' 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Peter', 'Gabriel', 1, NULL),
  ('Nasty', 'Pierogi', 1, 1),
  ('Travis', 'Scott', 2, NULL),
  ('Serbio', 'Valaquentez', 3, NULL);

