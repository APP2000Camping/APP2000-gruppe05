// HomePage.js
import React, { useState, useEffect } from 'react';
import styles from './backgroundpicture.module.css';


const BackgroundPicture = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    // Fetch the default background image from blob storage on component mount
    fetchBackgroundImage();
  }, []); // Run this effect only once on component mount

  const fetchBackgroundImage = async () => {
    try {
      const response = await fetch ('./api/file'); // Update the API endpoint accordingly
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setBackgroundImage(imageUrl);
    } catch (error) {
      console.error('Error fetching background image:', error);
    }
  };

  const handleChooseImage = async () => {
    try {
      // Open a file selection dialog
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.addEventListener('change', async (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
          // Fetch and display the newly chosen background image
          fetchBackgroundImage();
        }
      });
      input.click();
    } catch (error) {
      console.error('Error choosing background image:', error);
    }
  };

  return (
    <div className={styles.BackgroundPicture}>
      <div>
      <h1>Camping</h1>
      <p>Choose a background image:</p>

      {/* Button to trigger choosing a background image */}
      <button onClick={handleChooseImage}>Choose Image</button>

      {/* Display the chosen image */}
      {backgroundImage && (
        <div>
          <p>Chosen Background Image:</p>
          <img src={backgroundImage} alt="Chosen Background" style={{ maxWidth: '100%' }} />
        </div>
      )}
      </div>
    </div>
  );
};

export default BackgroundPicture;
