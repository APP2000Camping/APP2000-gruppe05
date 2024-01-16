// ImageUploader.js

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ImageUploader.module.css";

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    try {
      // Assuming you have an API endpoint for image uploads
      const apiUrl = "YOUR_MONGODB_API_ENDPOINT";

      if (image) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: image }),
        });

        if (response.ok) {
          console.log("Image uploaded successfully!");
          // You may want to handle further actions after successful upload
        } else {
          console.error("Failed to upload image");
        }
      } else {
        console.error("No image selected for upload");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Image Uploader</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.input}
      />

      {image && (
        <div className={styles.previewContainer}>
          <h2>Preview:</h2>
          <Image src={image} alt="Uploaded Image" width={500} height={300} />

          <button onClick={handleUpload} className={styles.uploadButton}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
