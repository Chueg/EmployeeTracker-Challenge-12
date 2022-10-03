INSERT INTO department (name )
 VALUES ("Ranch Dept"),
       ("Data Science Dept"),
       ("Math Dept"),
       ("Electives Dept");

INSERT INTO role ( title, salary, department_id)

 VALUES ("Lunchables Lover", 201024, 1),
      ("Tone Deaf", 201024, 4),
        ("Live in the floor", 201024, 2),
     ("Big Eat the food", 201024, 3);

INSERT INTO employee (first_name, last_name, role_id, manager) 

VALUES ("Joe", "Swanson",2, NULL),
        ("Munch", "Boxen",3, "Joe Swanson" ),
        ("Rippy", "Beef Quentin",4, NULL),
        ("Big", "Barry",1, "Rippy Beef Quentin");