// BackgroundUploader.js
import React, { useState } from 'react';
import styles from './backgrounduploader.module.css';

const BackgroundUploader = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBackgroundImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Your existing navbar */}
      
      
      {/* Grey background area for the image */}
      <div className={styles.imageContainer}>
        {/* Main content with background image */}
        <div
          className={styles.mainContent}
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {/* Other homepage content */}
        </div>

        {/* Upload button */}
        <div className={styles.uploadButtonContainer}>
          <label htmlFor="uploadInput" className={styles.uploadButton}>
            Last opp bakgrunnbilde
          </label>
          <input
            type="file"
            id="uploadInput"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundUploader;
