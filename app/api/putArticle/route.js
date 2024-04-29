// Skrevet av Sondre
import { getClient } from "@/app/utils/db";
import { ObjectId } from "mongodb";

const database = await getClient();
const articles = database.collection('Artikler');
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, content } = body;

    
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Ugyldig ID format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (title == null || content == null) {
      return new Response(JSON.stringify({ error: 'Tittel eller innhold mangler' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    

    
    const updateResult = await articles.updateOne(
      { _id: new ObjectId(id) },
      { $set: {  title, content } }
    );

    
    if (!updateResult.matchedCount) {
      return new Response(JSON.stringify({ error: 'Artikkel ikke funnet' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    
    return new Response(JSON.stringify({ success: true, message: 'Artikkel oppdatert' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Feil under behandling av PUT-forespørsel:', error);
    return new Response(JSON.stringify({ error: 'Server feil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}