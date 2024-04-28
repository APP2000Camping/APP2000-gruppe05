// Skrevet av Rolf
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { getClient } from "@/app/utils/db";
import { getRoleByEmail } from "../../getUser/route";
import { getTlfByEmail } from "../../getUser/route";

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
                    //console.log(user)
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
  callbacks: {
    session: async ({ session }) => {
      try {
        if (session?.user?.email) {
          const { email } = session.user;
          const role = await getRoleByEmail(email);
          const tlf = await getTlfByEmail(email);

          session.user = {
            ...session.user,
            role,
            tlf,
          };
        }
        return Promise.resolve(session);
      } catch (error) {
        console.log("callbacks error", error);
      }
    },
  },
  session: {
    jwt: true,
    maxAge: 2 * 60 * 60
  },
};

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};