import { connectDataBase, insertDocument } from "../../utils/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Email is not valid." });
      return null;
    }
    let client;
    try {
      client = await connectDataBase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database fail." });
      return null;
    }

    try {
      await insertDocument(client, "emails", { email: userEmail });
      client.close();
      res.status(201).json({ message: "Sgin up" });
    } catch (error) {
      res.status(500).json({ message: "Inserting dat to the database fail." });
      return null;
    }
  }
}

export default handler;
