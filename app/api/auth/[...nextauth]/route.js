// Skrevet av Rolf
import NextAuth from "next-auth"
//import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { getClient } from "@/app/utils/db";

const database = await getClient();
const users = database.collection("users");

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "text"},
            password: {label: "Password", type: "password"},
        },
        async authorize(credentials) {
            try {
                const user = await users.findOne({email: credentials.email});
                if (user) {
                    console.log(user)
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword,
                    )
                    if (isPasswordCorrect) {
                        return user;
                    }
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        }
    }),
  ],
  session: {
    jwt: true,
    maxAge: 2 * 60 * 60
  }
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};