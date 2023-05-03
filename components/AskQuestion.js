import React from "react";
import { TextField } from "@mui/material";
import styles from "../styles/styles.module.css";

const AskQuestion = ({ onKeyPress }) => {
  return (
    <div className={styles.center}>
      <TextField
        fullWidth
        className={styles.questionInput}
        label="Ask your question"
        variant="outlined"
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
export default AskQuestion;
