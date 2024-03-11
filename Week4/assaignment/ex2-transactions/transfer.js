import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

export async function transfer(from, to, amount, remark) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("accounts");

    const session = client.startSession();
    try {
      session.startTransaction();

      const fromAccount = await collection.findOne({ account_number: from });
      const toAccount = await collection.findOne({ account_number: to });

      if (!fromAccount || !toAccount) {
        throw new Error("Account not found");
      }

      if (fromAccount.balance < amount) {
        throw new Error("Insufficient balance");
      }

      await collection.updateOne(
        { account_number: from },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: fromAccount.account_changes.length + 1,
              amount: -amount,
              changed_date: new Date(),
              remark,
            },
          },
        },
        { session }
      );

      await collection.updateOne(
        { account_number: to },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number: toAccount.account_changes.length + 1,
              amount,
              changed_date: new Date(),
              remark,
            },
          },
        },
        { session }
      );

      await session.commitTransaction();
      console.log("Transaction committed");
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } finally {
    await client.close();
  }
}
export default transfer;
