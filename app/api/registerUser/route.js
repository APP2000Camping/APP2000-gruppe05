// Skrevet av Rolf
import { MongoClient } from "mongodb";

// Initialiserer mongodb klienten
const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("userLogin");
const users = database.collection("users");

export async function POST(req) {
  try {
    const dbkeytest = process.env.MONGODB_URI;
    console.log(dbkeytest);
    const doc = await req.json();

    // Stopper prossessen når duplicateCheck() er true
    if (await duplicateCheck(doc)) {
      return new Response( JSON.stringify({ response: "User already exists" }), {
        status: 403, 
      })
    }

    const result = await users.insertOne(doc);
    
  } finally {
    await client.close();

    return new Response( JSON.stringify({ response: "Inserted document" }), {
        status: 200,
      })
  }
}

// Checks if the userID input to the form already exists, if true it exists
async function duplicateCheck(doc) {

  const query = { userID: doc.userID };

  const user = await users.findOne(query);

  console.log(user);

  if (user) {
    return true;
  } else {
    return false;
  }
}