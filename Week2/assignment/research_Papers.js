import mysql from "mysql2";
export const researchPaper = () => {
  const connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "123456",
    database: "university",
    port: 3306,
    multipleStatements: true,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }
    console.log("Connected to the database");

    const query = `CREATE TABLE IF NOT EXISTS research_papers(
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255) NOT NULL,
    conference VARCHAR(255) NOT NULL,
    date_published DATE NOT NULL
  );`;

    connection.query(query, (err, result) => {
      if (err) {
        console.error("Error executing query"); 
        return;
      }
      console.log("Research papers table created");
    });

    connection.end((err) => {
      if (err) {
        console.error("Error closing the connection"); 
        return;
      }
      console.log("Connection to the database is closed");
    });
  });
};
