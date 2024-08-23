import { MongoClient } from "mongodb";
import {
  connectDataBase,
  getAllDocments,
  insertDocument,
} from "../../../utils/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDataBase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database faild." });
    return null;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid inputs." });
      client.close();
      return null;
    }
    let newComment = {
      email,
      text,
      name,
      eventId: eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      res
        .status(201)
        .json({ message: "comment add successfully.", newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data to the database fail." });
    }
  }
  if (req.method === "GET") {
    try {
      const comments = await getAllDocments(client, "comments", eventId);
      res.status(200).json({ comments });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Faild to get all comments." });
    }
  }
  client.close();
}

export default handler;
