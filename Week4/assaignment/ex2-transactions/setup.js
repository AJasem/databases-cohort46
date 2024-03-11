import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const { MongoClient } = mongodb;

const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
// It should clean up the `accounts` array and then fill it with some sample data. Just like last last week we want an
//    account document to have an `account_number` and `balance` field. Then it should have another field
//    called `account_changes` that is an array that contains the fields: `change_number, amount, changed_date, remark`.

export async function setup() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("accounts");

    await collection.deleteMany({});

    const accounts = [
      {
        account_number: 101,
        balance: 10000,
        account_changes: [
          {
            change_number: 1,
            amount: -1000,
            changed_date: new Date(),
            remark: "withdrawal",
          },
        ],
      },
      {
        account_number: 102,
        balance: 20000,
        account_changes: [
          {
            change_number: 1,
            amount: 2000,
            changed_date: new Date(),
            remark: "new year bonus",
          },
        ],
      },
      {
        account_number: 103,
        balance: 30000,
        account_changes: [
          {
            change_number: 1,
            amount: -1000,
            changed_date: new Date(),
            remark: "withdrawal",
          },
        ],
      },
    ];

    await collection.insertMany(accounts);
    console.log("Sample data has been added");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

export default setup;
