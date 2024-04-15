// booking.js
import React from 'react';

import '../globals.css';  
import BookingForm from '../../components/bookingForm';

const BookingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <BookingForm />
      </main>
      <footer />
    </div>
  );
};

export default BookingPage;
