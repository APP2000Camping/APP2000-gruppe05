// app/api/getBooking.js
import { getClient } from "@/app/db"; 

async function getBookingsByEmail(emailId) {
  const database = await getClient();
  const bookings = database.collection('Booking');
  const query = emailId ? { emailId: emailId } : {}; 
  return await bookings.find(query).toArray();
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const emailId = searchParams.get('email');
    
    const allBookings = await getBookingsByEmail(emailId); 

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
