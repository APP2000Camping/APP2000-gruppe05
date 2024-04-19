// app/api/getArticle.js

import { getClient } from "@/app/db"; 
const database = await getClient();
const articles = database.collection('Artikler');

export async function GET(req) {
  try {
    
    if (!database) {
      throw new Error('Databaseforbindelsen mislyktes');
    }
    

    const allArticles = await articles.find().toArray(); 

    if (!allArticles.length) {
      return new Response(JSON.stringify({ error: 'Ingen artikler funnet' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(allArticles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Feil under behandling av GET-forespørsel:', error);
    return new Response(JSON.stringify({ error: 'Server feil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}