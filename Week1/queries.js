const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "123456",
  database: "world",
});

connection.connect();

connection.query(
  "SELECT Name FROM country WHERE Population > 8000000",
  (err, results) => {
    if (err) throw err;
    console.log(
      "1. Countries with population greater than 8 million:",
      results
    );
  }
);

connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  (err, results) => {
    if (err) throw err;
    console.log('2. Countries that have "land" in their names:', results);
  }
);

connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  (err, results) => {
    if (err) throw err;
    console.log(
      "3. Cities with population between 500,000 and 1 million:",
      results
    );
  }
);

connection.query(
  "SELECT Name FROM country WHERE continent =  'Europe'",
  (err, results) => {
    if (err) throw err;
    console.log("4. countries on the continent ‘Europe’:", results);
  }
);

connection.query(
  "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC",
  (err, results) => {
    if (err) throw err;
    console.log("5. countries ordered by serfice area:", results);
  }
);

connection.query(
  "SELECT name FROM city WHERE CountryCode = 'NLD'",
  (err, results) => {
    if (err) throw err;
    console.log("6. all cities in the Netherland:", results);
  }
);

connection.query(
  "SELECT population FROM city WHERE name = 'Rotterdam'",
  (err, results) => {
    if (err) throw err;
    console.log("7.Rotterdam population:", results);
  }
);

connection.query(
  "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC limit 10",
  (err, results) => {
    if (err) throw err;
    console.log("8. top 10 countries by serfuce area", results);
  }
);

connection.query(
  "SELECT Name, population FROM city ORDER BY population DESC limit 10",
  (err, results) => {
    if (err) throw err;
    console.log("9. top 10 cities by population", results);
  }
);

connection.query("SELECT SUM(Population)  FROM country", (err, results) => {
  if (err) throw err;
  console.log("10.the world population", results);
});

connection.end();
