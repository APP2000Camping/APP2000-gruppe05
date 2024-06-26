// Skrevet av Sondre / Marcus

import { getClient } from "@/app/utils/db";
import { ObjectId } from "mongodb";

const database = await getClient();
const articles = database.collection('Booking');

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); 

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Ugyldig ID format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const deletionResult = await articles.deleteOne({ _id: new ObjectId(id) });
    if (deletionResult.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Booking ikke funnet eller allerede slettet' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Booking slettet' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Feil under behandling av DELETE-forespørsel:', error);
    return new Response(JSON.stringify({ error: 'Server feil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
