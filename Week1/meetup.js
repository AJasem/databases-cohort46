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
    create table if not exists Meeting_invitee (
      meeting_no int,
      invitee_no int,
      primary key (meeting_no, invitee_no),
      foreign key (meeting_no) references Meeting(meeting_no),
      foreign key (invitee_no) references Invitee(invitee_no)
    );
   
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;

    console.log("Database and tables created successfully");
  });

  const insertQuery = `

      INSERT INTO Invitee (invitee_no, invitee_name, invited_by)
      VALUES
        (1, 'John Doe', 'Manager'),
        (2, 'Jane Smith', 'Supervisor'),
        (3, 'Bob Johnson', 'Colleague');
      
      
      INSERT INTO Room (room_no, room_name, floor_number)
      VALUES
        (101, 'Conference Room A', 1),
        (102, 'Meeting Room B', 2),
        (103, 'Board Room', 3);
      
        INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
        VALUES
          (1, 'Team Meeting', '2024-03-06 10:00:00', '2024-03-06 12:00:00', 101),
          (2, 'Project Kickoff', '2024-03-07 14:00:00', '2024-03-07 16:00:00', 102);
        
      INSERT INTO Meeting_invitee (meeting_no, invitee_no)
      VALUES
        (1, 1),
        (1, 2),
        (2, 3);
      
      
      
      `;

  connection.query(insertQuery, (err, results) => {
    if (err) throw err;
    console.log("Data inserted successfully");
  });
  connection.end();
});
