import { MongoClient } from "mongodb";

export const connectDataBase = async () => {
  const client = await MongoClient.connect(process.env.DB_URL);
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocments = async (client, collection, eventId) => {
  const db = client.db();
  const comments = await db
    .collection(collection)
    .find({ eventId })
    .sort({ _id: -1 })
    .toArray();

  return comments;
};
