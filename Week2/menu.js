import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: 3306,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database");

  const query = `
    CREATE DATABASE IF NOT EXISTS Restaurant;
    USE Restaurant;
    CREATE TABLE IF NOT EXISTS CATEGORY (CATEGORY_ID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(255));
    CREATE TABLE IF NOT EXISTS RECIPE (RECIPE_ID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(255));
    CREATE TABLE IF NOT EXISTS INGREDIENT (INGREDIENT_ID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(255));
    CREATE TABLE IF NOT EXISTS STEPS (STEP_ID INT PRIMARY KEY AUTO_INCREMENT, DESCRIPTION VARCHAR(255));
    CREATE TABLE IF NOT EXISTS RECIPE_INGREDIENT (RECIPE_ID INT, INGREDIENT_ID INT, QUANTITY VARCHAR(100), FOREIGN KEY (RECIPE_ID) REFERENCES RECIPE(RECIPE_ID), FOREIGN KEY (INGREDIENT_ID) REFERENCES INGREDIENT(INGREDIENT_ID));
    CREATE TABLE IF NOT EXISTS RECIPE_STEPS (RECIPE_ID INT, STEP_ID INT, STEP_ORDER INT, FOREIGN KEY (RECIPE_ID) REFERENCES RECIPE(RECIPE_ID), FOREIGN KEY (STEP_ID) REFERENCES STEPS(STEP_ID));
    CREATE TABLE IF NOT EXISTS RECIPE_CATEGORY(RECIPE_ID INT, CATEGORY_ID INT, FOREIGN KEY (RECIPE_ID) REFERENCES RECIPE(RECIPE_ID), FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID));
  `;

  const insertQuery = `
  INSERT INTO CATEGORY (NAME) VALUES
    ('Cake'),
    ('No-Bake'),
    ('Vegetarian'),
    ('Vegan'),
    ('Gluten-Free'),
    ('Japanese');

  INSERT INTO RECIPE (NAME) VALUES
    ('No-Bake Cheesecake'),
    ('Roasted Brussels Sprouts'),
    ('Mac & Cheese'),
    ('Tamagoyaki Japanese Omelette');

    INSERT INTO RECIPE_CATEGORY (RECIPE_ID, CATEGORY_ID) VALUES
    (1,1),
    (1,2),
    (1,3),
    (2,4),
    (2,5),
    (3,3),
    (4,3),
    (4,6);

  INSERT INTO INGREDIENT (NAME) VALUES
    ('Condensed milk'),
    ('Cream Cheese'),
    ('Lemon Juice'),
    ('Pie Crust'),
    ('Cherry Jam'),
    ('Brussels Sprouts'),
    ('Sesame seeds'),
    ('Pepper'),
    ('Salt'),
    ('Olive oil'),
    ('Macaroni'),
    ('Butter'),
    ('Flour'),
    ('Milk'),
    ('Shredded Cheddar cheese'),
    ('Eggs'),
    ('Soy sauce'),
    ('Sugar');

  INSERT INTO STEPS (DESCRIPTION) VALUES
    ('Beat Cream Cheese'),
    ('Add condensed Milk and blend'),
    ('Add Lemon Juice and blend'),
    ('Add the mix to the pie crust'),
    ('Spread the Cherry Jam'),
    ('Place in refrigerator for 3h.'),
    ('Preheat the oven'),
    ('Mix the ingredients in a bowl'),
    ('Spread the mix on baking sheet'),
    ('Bake for 30'),
    ('Cook Macaroni for 8'),
    ('Melt butter in a saucepan'),
    ('Add flour, salt, pepper and mix'), 
    ('Add Milk and mix'),
    ('Cook until mix is smooth'),
    ('Add cheddar cheese'),
    ('Add the macaroni'),
    ('Beat the eggs'),
('Add soya sauce, sugar and salt'),
('Add oil to a sauce pan'),
('Bring to medium heat'),
('Add some mix to the sauce pan'),
('Let is cook for 1'),
('Add oil to a sauce pan'),
('Remove pan from fire');
`;

  const insertRecipeStepsQuery = `
    INSERT INTO RECIPE_STEPS (RECIPE_ID, STEP_ID, STEP_ORDER) VALUES
      (1, 1, 1),
      (1, 2, 2),
      (1, 3, 3),
      (1, 4, 4),
      (1, 5, 5),
      (1, 6, 6),
      (2, 7, 1),
      (2, 8, 2),
      (2, 9, 3),
      (2, 10, 4),
      (3, 11, 1),
      (3, 12, 2),
      (3, 13, 3),
      (3, 14, 4),
      (3, 15, 5),
      (3, 16, 6),
      (3, 17, 7),
      (4, 18, 1),
      (4, 19, 2),
      (4, 20, 3),
      (4, 21, 4),
      (4, 22, 5),
      (4, 23, 6),
      (4, 24, 7),
      (4, 22, 8),
      (4, 23, 9),
      (4, 25, 10);
      
  `;

  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Database and tables created successfully");

    connection.query(insertQuery, (err, result) => {
      if (err) throw err;
      console.log(
        "Data inserted into CATEGORY, RECIPE, INGREDIENT, STEPS, and RECIPE_INGREDIENT tables successfully"
      );

      connection.query(insertRecipeStepsQuery, (err, result) => {
        if (err) throw err;
        console.log("Data inserted into RECIPE_STEPS table successfully");
        connection.end();
      });
    });
  });
});
