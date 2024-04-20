// Skrevet av Rolf
import NextAuth from "next-auth"
//import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { getClient } from "@/app/utils/db";
import bcrypt from "bcryptjs";

const database = await getClient();
const users = database.collection("users");

export const authOptions = {
  // Configure one or more authentication providers
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
  },
  callbacks: {
    async jwt(token, user) {
        if (user) {
            token.id = user.id;
            token.role = user.role;
        }
        return token;
    },
    async session(session, token) {
        session.user.id = token.id;
        session.user.role = token.role;
        return session;
    }
  },
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};