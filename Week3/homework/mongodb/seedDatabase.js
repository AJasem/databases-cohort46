import fs from "fs";

const jsonData = fs.readFileSync(
  "C:/Users/user/OneDrive/سطح المكتب/databases-cohort46/Week3/homework/mongodb/data.json",
  "utf-8"
);
const data = JSON.parse(jsonData);
/**
 * This function will drop and recreate the collection of sample data in our csv file.
 * By doing this we ensure that your functions are working on the same data, very similar to how you would set up a test environment.
 *
 * @param {MongoClient} client - The client that is connected to your database
 */
const seedDatabase = async (client) => {
  const hasCollection = await client
    .db("databaseWeek3")
    .listCollections({ name: "bob_ross_episodes" })
    .hasNext();

  if (hasCollection) {
    const bobRossCollection = await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes");

    // Remove all the documents
    await bobRossCollection.deleteMany({});

    // Convert data to array version of elements
    const documents = data.map((dataItem) => {
      const { EPISODE, TITLE } = dataItem;

      const depictionElementKeys = Object.keys(dataItem).filter(
        (key) => !["EPISODE", "TITLE"].includes(key)
      );
      const depictionElements = depictionElementKeys.filter(
        (key) => dataItem[key] === 1
      );

      return {
        episode: EPISODE,
        // Remove the extra quotation marks
        title: TITLE.replaceAll('"', ""),
        elements: depictionElements,
      };
    });

    // Add our documents
    await bobRossCollection.insertMany(documents);
  } else {
    throw Error("The collection `bob_ross_episodes` does not exist!");
  }
};

export default seedDatabase;
