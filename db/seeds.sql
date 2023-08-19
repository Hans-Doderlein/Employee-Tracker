--load different deparmtents
INSERT into department ( department_id, department_name)
VALUES
    (100, "Front of House"),
    (200, "Back of House");

--loads different roles
INSERT INTO role ( role_name, role_id, department_name , role_salary) 
VALUES
    ("Server",101,"Front of House",50000),
    ('Busser',102,"Front of House",18000),
    ("Hostess",103,"Front of House",15000),
    ('Driver',104,"Front of House",18000),
    ("Cashier",105,"Front of House",15000),
    ('Front of House Manager',106,"Front of House",45000),
    ("Head Chef",201,"Back of House",80000),
    ('Chef',202,"Back of House",50000),
    ('Cooks/Prep',203,"Back of House",40000),
    ('Dish Washer',204,"Back of House",30000);

--loads different employees
    INSERT INTO employee (employee_id, first_name, last_name, role_name,department_name,role_salary, manager_name ) 
    VALUES
        (109,'Amanda','Byrnes','Front of House Manager','Front of House',45000,null),
        (101,'Kayla','Cruz','Server','Front of House',50000,'Amanda'),
        (102,'Andrea','Gutierez','Busser','Front of House',18000,'Kayla'),
        (103,'Johan','Gomez','Busser','Front of House',18000,'Kayla'),
        (104,'Francesca','Bartoletta','Hostess','Front of House',15000,'Amanda'),
        (105,'Stephano','Quiroz','Driver','Front of House',18000,'Amanda'),
        (106,'Logan',"Rudnick",'Driver','Front of House',18000, 'Amanda'),
        (107,'Emily','Johanson','Cashier','Front of House',15000,'Amanda'),
        (108,'Jeremiah',"Garret",'Cashier','Front of House',15000,'Amanda'),
        
        (201,"Nick",'Doderlein','Head Chef','Back of House',80000,null),
        (202,'Armando','Rodriguez','Chef','Back of House',50000,'Nick'),
        (203,'Franco','Rodriguez','Chef','Back of House',50000,'Nick'),
        (204,'Chaz',"Wilson",'Cooks/Prep','Back of House',40000, 'Nick'),
        (205,'Pierre',"LePaul",'Dish Washer','Back of House',30000,'Nick');