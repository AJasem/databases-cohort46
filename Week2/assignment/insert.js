import mysql from "mysql2";

export const insertData = () => {
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

    let authors = [
      ["Alice White", "Yale University", "1983-06-06", 12, "Female"],
      ["David Miller", "Princeton University", "1979-07-07", 25, "Male"],
      ["Emily Taylor", "Oxford University", "1984-08-08", 16, "Female"],
      ["Michael Wilson", "ETH Zurich", "1977-09-09", 19, "Male"],
      ["Sophia Lee", "Columbia University", "1985-10-10", 14, "Female"],
      ["Daniel Brown", "University of Chicago", "1976-11-11", 30, "Male"],
      ["Olivia Smith", "Harvard University", "1986-12-12", 17, "Female"],
      ["Donald J.Trump", "Stanford University", "1974-01-13", 21, "Male"],
      ["Ella Davis", "MIT", "1987-02-14", 23, "Female"],
      ["Alexander Martin", "Caltech", "1973-03-15", 27, "Male"],
      ["Ava Wilson", "University of Cambridge", "1988-04-16", 13, "Female"],
      ["Henry Miller", "UC Berkeley", "1972-05-17", 28, "Male"],
      [
        "Grace Taylor",
        "Carnegie Mellon University",
        "1989-06-18",
        11,
        "Female",
      ],
      ["Christopher Lee", "University of Tokyo", "1971-07-19", 26, "Male"],
      ["Lily White", "Brown University", "1990-08-20", 15, "Female"],
    ];
    const updateQuery = `
    UPDATE authors SET mentor = author_id WHERE mentor IS NULL;
  `;
    let papers = [
      [
        "Understanding Dark Matter in the Universe",
        "Astrophysics Conference",
        "2021-06-06",
      ],
      [
        "Ethical Considerations in Artificial Intelligence",
        "Ethics in AI Symposium",
        "2021-07-07",
      ],
      [
        "Renewable Energy Sources and Sustainable Development",
        "Energy Conference",
        "2021-08-08",
      ],
      [
        "Applications of Blockchain Technology",
        "Blockchain Summit",
        "2021-09-09",
      ],
      [
        "Neuroscience and Brain-Computer Interfaces",
        "NeuroTech Symposium",
        "2021-10-10",
      ],
      [
        "Advancements in Quantum Computing",
        "Quantum Computing Workshop",
        "2021-11-11",
      ],
      [
        "Biodiversity Conservation and Ecosystem Preservation",
        "Ecology Conference",
        "2021-12-12",
      ],
      [
        "Challenges in Cybersecurity: A Comprehensive Review",
        "Cybersecurity Summit",
        "2022-01-13",
      ],
      [
        "Emerging Trends in Biomedical Engineering",
        "Biomed Conference",
        "2022-02-14",
      ],
      [
        "Human-Computer Interaction and User Experience",
        "HCI Symposium",
        "2022-03-15",
      ],
      [
        "Advances in Materials Science for Sustainable Technologies",
        "Materials Science Conference",
        "2022-04-16",
      ],
      [
        "Global Health Challenges and Innovations",
        "Healthcare Summit",
        "2022-05-17",
      ],
      [
        "Smart Cities and Urban Planning",
        "Urban Tech Conference",
        "2022-06-18",
      ],
      [
        "The Role of Artificial Intelligence in Healthcare",
        "AI in Healthcare Workshop",
        "2022-07-19",
      ],
      [
        "Space Exploration: Past, Present, and Future",
        "Space Science Symposium",
        "2022-08-20",
      ],
      ["Advancements in 5G Technology", "5G Summit", "2022-09-21"],
      [
        "Social Media and its Impact on Society",
        "Social Media Conference",
        "2022-10-22",
      ],
      [
        "Renal Health: Challenges and Solutions",
        "Nephrology Conference",
        "2022-11-23",
      ],
      ["The Future of Robotics and Automation", "Robotics Expo", "2022-12-24"],
      [
        "Advances in Precision Medicine",
        "Precision Medicine Symposium",
        "2023-01-25",
      ],
      [
        "Cyber-Physical Systems and Internet of Things",
        "CPS & IoT Conference",
        "2023-02-26",
      ],
      [
        "Environmental Sustainability and Green Technologies",
        "GreenTech Summit",
        "2023-03-27",
      ],
      [
        "Innovations in Educational Technology",
        "EdTech Conference",
        "2023-04-28",
      ],
      [
        "Applications of Augmented Reality in Industry",
        "AR in Industry Workshop",
        "2023-05-29",
      ],
      [
        "Cancer Research: Recent Breakthroughs",
        "Cancer Symposium",
        "2023-06-30",
      ],
      [
        "Advances in Cognitive Computing",
        "Cognitive Computing Conference",
        "2023-07-31",
      ],
      [
        "Exploring the Mysteries of the Microbiome",
        "Microbiome Summit",
        "2023-08-01",
      ],
      [
        "Smart Agriculture and Precision Farming",
        "AgriTech Conference",
        "2023-09-02",
      ],
      [
        "Frontiers in Quantum Biology",
        "Quantum Biology Workshop",
        "2023-10-03",
      ],
      [
        "The Impact of 3D Printing on Manufacturing",
        "3D Printing Symposium",
        "2023-11-04",
      ],
      ["Future Trends in Space Tourism", "Space Tourism Summit", "2023-12-05"],
    ];

    let authorPaperAssociations = [
      [1, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 1],
      [15, 2],
      [14, 3],
      [13, 4],
      [12, 5],
      [11, 6],
      [10, 7],
      [9, 8],
      [9, 9],
      [7, 10],
      [6, 11],
      [5, 12],
      [4, 13],
      [3, 14],
      [2, 15],
      [15, 16],
      [15, 17],
      [14, 18],
      [13, 19],
      [12, 20],
      [11, 21],
      [10, 22],
      [9, 23],
      [9, 24],
      [7, 25],
      [6, 26],
      [5, 27],
      [4, 28],
      [3, 29],
      [2, 30],
      [1, 30],
      [8, 29],
      [8, 28],
      [8, 27],
      [9, 27],
      [1, 27],
    ];

    let sqlAuthors =
      "INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES ?";
    connection.query(sqlAuthors, [authors], function (err) {
      if (err) throw err;
      console.log("Authors inserted");
    });

    connection.query(updateQuery, (err, result) => {
      if (err) {
        console.error("Error updating mentors: " + err.stack);
        return;
      }

      console.log("Mentors updated");
    });

    let sqlPapers =
      "INSERT INTO research_papers (paper_title, conference, date_published) VALUES ?";
    connection.query(sqlPapers, [papers], function (err) {
      if (err) throw err;
      console.log("Papers inserted");
    });

    let sqlAuthorPapers =
      "INSERT INTO author_researchPapers (author_id, paper_id) VALUES ?";
    connection.query(
      sqlAuthorPapers,
      [authorPaperAssociations],
      function (err) {
        if (err) throw err;
        console.log("Author-Paper associations inserted");
      }
    );

    connection.end((err) => {
      if (err) {
        console.error("Error closing the connection: " + err.stack);
        return;
      }
      console.log("Connection to the database is closed");
    });
  });
};
