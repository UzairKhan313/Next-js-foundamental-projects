import { connectToDatabasee } from "../../../utils/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6
    ) {
      res.status(422).json({
        message:
          "Invalid input data. password must be atleast six character long.",
      });
      return null;
    }

    const client = await connectToDatabasee();
    const db = client.db();

    const existingUser = await db.collection("user").findOne({ email });
    if (existingUser) {
      client.close();
      res
        .status(422)
        .json({ message: "Email already registered please pick another one." });
      return null;
    }

    const result = await db.collection("user").insertOne({ email, password });
    client.close();
    res.status(201).json({ message: "User register successfully" });
  }
}

export default handler;
