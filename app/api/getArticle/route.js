// app/api/getArticle.js
import { getClient } from "@/app/db"; 

async function getArticlesBySection(section) {
  const database = await getClient();
  const articles = database.collection('Artikler');
  const query = section ? { section: section } : {}; 
  return await articles.find(query).toArray();
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section'); 
    
    const allArticles = await getArticlesBySection(section);

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
