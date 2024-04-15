// Skrevet av Rolf
import { getClient } from "@/app/db";


const database = await getClient();
const users = database.collection("Artikler");

export async function POST(req) {
  try {
    const doc = await req.json();

  

    const result = await users.insertOne(doc);
    
  } finally {

    return new Response( JSON.stringify({ response: "Inserted document" }), {
        status: 201,
      })
  }
}

