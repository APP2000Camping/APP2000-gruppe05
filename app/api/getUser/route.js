// Modifisert av Rolf
import { getClient } from "@/app/db";

async function getUserByEmail(email) {
    const database = await getClient();
    const users = database.collection('users');
    const query = email ? { email: email } : {};
    const user = await users.findOne(query);
    return user;
}

export async function getRoleByEmail(email) {
    const database = await getClient();
    const users = database.collection('users');
    const query = email ? { email: email } : {};
    const user = await users.findOne(query);
    return user ? user.role : null;
}

export async function getTlfByEmail(email) {
  const database = await getClient();
  const users = database.collection('users');
  const query = email ? { email: email } : {};
  const user = await users.findOne(query);
  return user ? user.tlf : null;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    const allUsers = await getUserByEmail(email);

    if (!allUsers.length) {
      return new Response(JSON.stringify({ error: 'Ingen brukere funnet' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(allBookings), {
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
