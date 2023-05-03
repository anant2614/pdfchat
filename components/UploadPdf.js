import React, { useState } from "react";
import styles from "../styles/styles.module.css";

const UploadPdf = ({ onFileChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setLoading(true);
    onFileChange(e, setLoading);
  };

  return (
    <div className={`${styles.uploadContainer} ${styles.center}`}>
      <input
        accept="application/pdf"
        id="upload-button"
        type="file"
        hidden
        onChange={handleFileChange}
      />
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <label htmlFor="upload-button">
          <span className={styles.customButton}>
            Upload PDF
          </span>
        </label>
      )}
    </div>
  );
};

export default UploadPdf;
