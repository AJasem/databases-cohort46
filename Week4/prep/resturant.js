import { MongoClient } from "mongodb";
import { recipes } from "./data.js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function insertRecipes() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const recipesCollection = db.collection("recipes");

    await recipesCollection.insertMany(recipes);
    console.log("Recipes inserted successfully");
  } catch (err) {
    console.error("Error inserting recipes:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

insertRecipes();
