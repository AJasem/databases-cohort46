import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: 3306,
  multipleStatements: true,
  database: "Restaurant",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database");

  const clearDataQuery = `
    -- Clear data from child tables first
    DROP DATABASE IF EXISTS Restaurant;
  `;

  connection.query(clearDataQuery, (err, result) => {
    if (err) throw err;
    console.log("Database cleared successfully");
    connection.end();
  });
});
