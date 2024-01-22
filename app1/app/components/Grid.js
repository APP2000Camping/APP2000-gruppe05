// components/Grid.js
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Grid.module.css"; // Import the CSS module

const Grid = () => {
  const [gridItems, setGridItems] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const uploadedImages = await Promise.all(
      acceptedFiles.map(async (file) => {
        const imageUrl = `/images/${file.name}`;

        // Save the image to the public/images directory on the server
        const formData = new FormData();
        formData.append("image", file);

        await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        return {
          image: imageUrl,
          text: "", // You can add text input logic here
        };
      })
    );

    setGridItems([...gridItems, ...uploadedImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ""}`}
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>
      <div className={styles["grid-container"]}>
        {gridItems.map((item, index) => (
          <div key={index} className={styles["grid-item"]}>
            <img
              src={process.env.NEXT_PUBLIC_BASE_PATH + item.image}
              alt="Uploaded"
            />
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
