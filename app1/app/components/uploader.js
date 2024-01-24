'use client';

// Import the CSS module
import styles from './uploader.module.css';
import React, { useState, useRef } from 'react';

// BackgroundUploader Component
const Uploader = () => {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);

  return (
    <div className={styles.container}>
      

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/file?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );

          try {
            const newBlob = await response.json();
            setBlob(newBlob);
          } catch (error) {
            console.error('Error parsing JSON response:', error);
          }
        }}
      >
        <label className={styles.fileLabel}>
          Choose File
          <input className={styles.file} ref={inputFileRef} type="file" required />
        </label>
        <button className={styles.uploadButtonContainer} type="submit">Upload</button>
      </form>
      {blob && (
        <div className={styles.blobContainer}>
          Blob url: <a className={styles.blobLink} href={blob.url}>{blob.url}</a>
        </div>
      )}
    </div>
  );
};

export default Uploader;

