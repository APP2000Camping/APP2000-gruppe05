// Skrevet av Rolf
import { getClient } from "@/app/[locale]/db";

const database = await getClient();
const users = database.collection("users");

export async function POST(req) {
  try {
    const doc = await req.json();

    // Stopper prossessen når duplicateCheck() er true
    if (await duplicateCheck(doc)) {
      return new Response( JSON.stringify({ response: "User already exists" }), {
        status: 403,
      })
    }

    const result = await users.insertOne(doc);
    
  } finally {

    return new Response( JSON.stringify({ response: "Inserted document" }), {
        status: 201,
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