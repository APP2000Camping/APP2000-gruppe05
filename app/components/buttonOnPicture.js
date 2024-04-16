import React from 'react';
import Picture from './picture';
import BookingButton from './bookingButton';
import styles from './buttonOnPicture.module.css';

const buttonOnPicture = () => {
    return (
        <div className={styles.buttonOnPicture}>
            <Picture imageUrl="https://placehold.co/1920x1080" altText="placeholder" />
            <BookingButton />
        </div>
    );
};

export default buttonOnPicture;