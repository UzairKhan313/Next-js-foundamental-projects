import { getServerSession } from "next-auth";
import { connectToDatabasee } from "../../../utils/db-utils";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  if (req.method === "PATCH") {
    const session = await getSession({ req });
    console.log(session);

    if (!session) {
      res.status(401).json({ message: "UnAthenticated." });
      return;
    }

    const userEmail = session.user.email;
    const { newPassword, oldPassword } = req.body;

    const client = await connectToDatabasee();

    const db = client.db().collection("user");

    const user = await db.findOne({ email: userEmail });

    if (!user) {
      client.close();
      res.status(404).json({ message: "User not Found." });
      return;
    }

    if (user.password != oldPassword) {
      res.status(403).json({ message: "Invalid old password." });
      client.close();
      return;
    }
    const result = await db.updateOne(
      { email: userEmail },
      { $set: { password: newPassword } }
    );
    client.close();
    res.status(200).json({ message: "Passwrod updated successfully." });
  }
}

export default handler;
