// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDatabasee } from "../../../utils/db-utils";

// export default NextAuth({
//   session: { jwt: true },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const client = await connectToDatabasee();
//         const db = client.db().collection("user");

//         const user = await db.findOne({ email: credentials.email });

//         if (!user) {
//           client.close();
//           throw new Error("Email not registered.");
//         }

//         if (user.password !== credentials.password) {
//           client.close();
//           throw new Error("Invalid credentials");
//         }

//         client.close();

//         return {
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt(token, user) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.user.id = token.id;
//       return session;
//     },
//   },
// });
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabasee } from "../../../utils/db-utils"; // Adjust the path as needed

export default NextAuth({
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabasee();
        const db = client.db().collection("user");

        const user = await db.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("Email not registered.");
        }

        if (user.password !== credentials.password) {
          client.close();
          throw new Error("Invalid credentials");
        }

        client.close();

        // Return the user object with `id` for the JWT callback
        return {
          id: user._id.toString(), // Ensure `_id` is converted to string
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      // Check if `user` exists and add `id` to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      // Ensure `token` has `id` and add it to `session.user`
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
