import { MongoClient } from "mongodb";

export async function connectToDatabasee() {
  const connectionString = `${process.env.mongodb_url}/${process.env.data_base}`;
  const client = MongoClient.connect(connectionString);
  return client;
}
