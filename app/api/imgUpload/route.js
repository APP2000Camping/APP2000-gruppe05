// Skrevet av Rolf
import { getClient } from "@/app/utils/db";
import ImageDataURI from "image-data-uri";

const database = await getClient();
const users = database.collection("bilder");

export async function POST(req) {
  try {
    const doc = await req.json();
    console.log(doc);
    console.log("route reached")

    const decodedDoc = ImageDataURI.decode(doc)
    console.log(decodedDoc);

    const result = await users.insertOne(doc);
    
  } finally {

    return new Response( JSON.stringify({ response: "Inserted document" }), {
        status: 200,
      })
  }
}

