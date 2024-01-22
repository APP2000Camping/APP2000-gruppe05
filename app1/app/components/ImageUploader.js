// ImageUploader.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './ImageUploader.module.css';

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      console.error('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.imageUrl;
      console.log('Uploaded Image URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className={styles.ImageUploader}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
    </div>
  );
};

export default ImageUploader;