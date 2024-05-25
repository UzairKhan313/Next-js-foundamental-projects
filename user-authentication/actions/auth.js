"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }
  if (password.trim().length < 4) {
    errors.password = "Password must be atleast four character long.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  //Enrytping password.
  const hashedPassword = hashUserPassword(password);

  try {
    //creating User
    const userId = createUser(email, hashedPassword);
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    // If email is already registered in data base.
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email:
            "It seems like an account for the choosen email is already exist.",
        },
      };
    }
    throw error;
  }
}
