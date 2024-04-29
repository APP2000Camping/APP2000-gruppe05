// Skrevet av Sondre
import { getClient } from "@/app/utils/db";

const database = await getClient();
const articles = database.collection("Artikler");

export async function POST(req) {
  try {
    const doc = await req.json();

    const result = await articles.insertOne(doc);
    const insertedId = result.insertedId; 

    return new Response(JSON.stringify({ response: "sendt in dokument", id: insertedId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error("Feil med innsending av dokument:", error);
    return new Response(JSON.stringify({ response: "Error ved sending av dokument", details: error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
