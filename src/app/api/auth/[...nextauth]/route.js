import { User } from "@/app/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../libs/mongoConnect"

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email
        const password = credentials?.password
        console.log('email', email)
        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });
        console.log('user', user)

        const isPasswordOk = user && bcrypt.compareSync('123456', user.password);
        console.log(isPasswordOk)
        
        if(isPasswordOk) {
          return user
        }
        return null;
      },
    }),
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
