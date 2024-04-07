// components/BookingForm.js
import React from 'react';
import styles from './bookingForm.module.css';

const BookingForm = () => {
  return (
    
    <div>
      <h1>Reservervasjon</h1>
      <div className={styles.BookingForm}>
      <div className={styles.formWrapper}>
      <form>
      <div>
          <label htmlFor="Plass">PlassNr: </label>
          <input type="PlassNr" id="PlassNr" name="PLassNr" placeholder="PlassNr" required />
        </div>
        <div>
          <label htmlFor="type">Type: </label>
          <input type="type" id="type" name="type" placeholder="Type" required />
        </div>
        <div>
          <label htmlFor="name">Navn: </label>
          <input type="text" id="name" name="name" placeholder="Navn" required />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input type="tel" id="phone" name="phone" placeholder="Telefonnummer" required />
        </div>
        <div>
          <label htmlFor="date">Dato: </label>
          <input type="date" id="date" name="date" required />
        </div>
        <button className={styles.formButton} type="submit">Reserver</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default BookingForm;

