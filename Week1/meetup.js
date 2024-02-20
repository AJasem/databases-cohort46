const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
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
    CREATE DATABASE IF NOT EXISTS meetup;
    USE meetup;
    CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no INT PRIMARY KEY,
      invitee_name VARCHAR(255),
      invited_by VARCHAR(255)
    );
    CREATE TABLE IF NOT EXISTS Room (
      room_no INT PRIMARY KEY,
      room_name VARCHAR(255),
      floor_number INT
    );
    CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT PRIMARY KEY,
      meeting_title VARCHAR(255),
      starting_time DATETIME,
      ending_time DATETIME,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    );
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;

    console.log("Database and tables created successfully");

    for (let i = 1; i <= 5; i++) {
      const insertQuery = `
        INSERT INTO Invitee VALUES (${i}, 'Invitee ${i}', 'Inviter ${i}');
        INSERT INTO Room VALUES (${i}, 'Room ${i}', ${i});
        INSERT INTO Meeting VALUES (${i}, 'Meeting ${i}', NOW(), DATE_ADD(NOW(), INTERVAL ${i} HOUR), ${i});
      `;

      connection.query(insertQuery, (err, results) => {
        if (err) throw err;
      });
    }

    connection.end();
  });
});
