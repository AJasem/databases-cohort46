import { MongoClient } from "mongodb";
import { ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import seedDatabase from "./seedDatabase.js";
dotenv.config();

async function createEpisodeExercise(client) {
  const bobRossCollection = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes");

  const newEpisode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  try {
    const result = await bobRossCollection.insertOne(newEpisode);
    console.log(
      `Created season 9 episode 13 and the document got the id ${result.insertedId}`
    );
  } catch (error) {
    console.error("Error creating episode:", error);
  }
}

async function findEpisodesExercises(client) {
  const bobRossCollection = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes");

  try {
    const episode = await bobRossCollection.findOne({ episode: "S02E02" });
    console.log(`The title of episode 2 in season 2 is ${episode.title}`);

    const blackRiver = await bobRossCollection.findOne({
      title: "BLACK RIVER",
    });
    console.log(
      `The season and episode number of the "BLACK RIVER" episode is ${blackRiver.episode}`
    );

    const cliffEpisodes = await bobRossCollection
      .find({ elements: "CLIFF" })
      .toArray();
    console.log(
      `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes
        .map((episode) => episode.title)
        .join(", ")}`
    );

    const cliffLightHouse = await bobRossCollection
      .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
      .toArray();
    console.log(
      `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffLightHouse
        .map((episode) => episode.title)
        .join(", ")}`
    );
  } catch (error) {
    console.error("Error finding episode:", error);
  }
}

async function updateEpisodeExercises(client) {
  const bobRossCollection = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes");

  try {
    const result = await bobRossCollection.updateOne(
      { episode: "S30E13" },
      { $set: { title: "BLUE RIDGE FALLS" } }
    );
    console.log(
      `Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`
    );

    const results = await bobRossCollection.updateMany(
      { elements: "BUSHES" },
      { $set: { "elements.$": "BUSH" } }
    );
    console.log(
      `Ran a command to update all the BUSHES to BUSH and it updated ${results.modifiedCount} episodes`
    );
  } catch (error) {
    console.error("Error updating episodes:", error);
  }
}

async function deleteEpisodeExercise(client) {
  const bobRossCollection = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes");

  try {
    const result = await bobRossCollection.deleteOne({ episode: "S31E14" });
    console.log(
      `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
    );
  } catch (error) {
    console.error("Error deleting episode:", error);
  }
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();
