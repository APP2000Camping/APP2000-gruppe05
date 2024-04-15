// app/api/putArticle/route.js
import { getClient } from "@/app/db";
import { ObjectId } from "mongodb";

// PUT handler for artikler
export async function PUT(request) {
  try {
    // body med json utgangspunkt
    const body = await request.json();
    const { id, article } = body;

    // Validering av ID og innhold
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Ugyldig ID format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!article) {
      return new Response(JSON.stringify({ error: 'Ingen artikkelinnhold sendt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Kobler til databasen med collection navn "Artikler"
    const database = await getClient();
    const articles = database.collection('Artikler');

    // Oppdaterer gitt artikkel i db
    const updateResult = await articles.updateOne(
      { _id: new ObjectId(id) },
      { $set: { article: article } }
    );

    // Sjekk for om oppdateringen er vellykka
    if (!updateResult.matchedCount) {
      return new Response(JSON.stringify({ error: 'Artikkel ikke funnet' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    //suksess responsen
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
