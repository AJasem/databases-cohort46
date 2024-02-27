import mysql from "mysql2";
import { researchPaper } from "./research_Papers.js";
import { insertData } from "./insert.js";
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

  const query = `CREATE DATABASE IF NOT EXISTS university;
        USE university;
        CREATE TABLE IF NOT EXISTS authors(
            author_id INT AUTO_INCREMENT PRIMARY KEY,
            author_name VARCHAR(255) NOT NULL,
            university VARCHAR(255) NOT NULL,
            date_of_birth date NOT NULL,
            h_index INT NOT NULL,
            gender ENUM('Male', 'Female') NOT NULL
        );`;

  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Authors table created");

    const checkColumnExistsQuery = `SELECT COUNT(*) AS count
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = 'university'
        AND TABLE_NAME = 'authors'
        AND COLUMN_NAME = 'mentor';`;

    connection.query(checkColumnExistsQuery, (err, result) => {
      if (err) throw err;

      if (result[0].count === 0) {
        const alterQuery = `ALTER TABLE authors ADD COLUMN mentor int ;
            ALTER TABLE authors ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);`;

        connection.query(alterQuery, (err, result) => {
          if (err) throw err;
          console.log("Authors table altered");
        });
      }
      researchPaper();

      const author_researchPapers = `CREATE TABLE IF NOT EXISTS author_researchPapers(
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
      );`;

      connection.query(author_researchPapers, (err, result) => {
        if (err) throw err;
        console.log("Author research papers table created");

        insertData();

        connection.end((err) => {
          if (err) throw err;
          console.log("Connection to the database is closed");
        });
      });
    });
  });
});
