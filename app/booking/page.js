// booking.js
import React from 'react';

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 
import BookingForm from '../components/bookingForm';

const BookingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
      <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
