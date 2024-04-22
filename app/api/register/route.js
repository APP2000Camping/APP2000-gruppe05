// Skrevet av Rolf
import { getClient } from "@/app/utils/db";
import bcrypt from "bcryptjs";

const database = await getClient();
const users = database.collection("users");

export async function POST(req) {
  try {
    
    const { email, password } = await req.json();

    const existingUser = await users.findOne({ email })

    if(existingUser) {
        return new Response( JSON.stringify({ response: "Email er allerede i bruk"}), {
            status: 400,
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const doc = {
      email,
      hashedPassword
    }

    const result = await users.insertOne(doc);

  } finally {

    return new Response( JSON.stringify({ response: "Inserted document" }), {
        status: 201,
      })
  }
}