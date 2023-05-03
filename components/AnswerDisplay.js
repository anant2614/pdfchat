import React from "react";
import styles from "../styles/styles.module.css";

const AnswerDisplay = ({ answer }) => {
  return (
    <div className={styles.answerDisplay}>
      <p>{answer}</p>
    </div>
  );
};

export default AnswerDisplay;
