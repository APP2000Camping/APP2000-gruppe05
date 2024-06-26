// Skrevet av Sondre / Marcus
import { getClient } from "@/app/db";

export async function getBookingsByEmail(email) {
  const database = await getClient();
  const bookings = database.collection('Booking');
  const query = email ? { email: email } : {};
  return await bookings.find(query).toArray();
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    const allBookings = await getBookingsByEmail(email);

    if (!allBookings.length) {
      return new Response(JSON.stringify({ error: 'Ingen bookinger funnet' }), {
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
