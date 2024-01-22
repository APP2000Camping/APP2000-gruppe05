// ImageUploader.js

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./ImageUploader.module.css";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [h1Title, setH1Title] = useState("Image Uploader");
  const [h2Title, setH2Title] = useState("Preview");

  const imageContainerRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);

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
      // Assuming you have an API endpoint for uploading content
      const apiUrl = "YOUR_MONGODB_API_ENDPOINT";

      if (image) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: image,
            h1Title: h1Title,
            h2Title: h2Title,
          }),
        });

        if (response.ok) {
          console.log("Content uploaded successfully!");
          // You may want to handle further actions after successful upload
        } else {
          console.error("Failed to upload content");
        }
      } else {
        console.error("No image selected for upload");
      }
    } catch (error) {
      console.error("Error uploading content:", error);
    }
  };

  const handleH1Change = () => {
    if (h1Ref.current) {
      setH1Title(h1Ref.current.innerText);
    }
  };

  const handleH2Change = () => {
    if (h2Ref.current) {
      setH2Title(h2Ref.current.innerText);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div>
          <h1
            ref={h1Ref}
            contentEditable
            onBlur={handleH1Change}
            className={styles.titleOverlay}
            suppressContentEditableWarning={true}
          >
            {h1Title}
          </h1>
        </div>
      </div>

      <div>
        <div>
          <h2
            ref={h2Ref}
            contentEditable
            onBlur={handleH2Change}
            className={styles.titleOverlay}
            suppressContentEditableWarning={true}
          >
            {h2Title}
          </h2>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.input}
      />

      <div ref={imageContainerRef} className={styles.previewContainer}>
        {image && (
          <>
            <Image
              src={image}
              alt="Uploaded Image"
              layout="responsive"
              width={500}
              height={300}
            />
          </>
        )}
      </div>

      {image && (
        <button onClick={handleUpload} className={styles.uploadButton}>
          Save
        </button>
      )}
    </div>
  );
}

export default ImageUploader;
