import Head from "next/head";
import { useState } from "react";
import styles from "../styles/styles.module.css";

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [answer, setAnswer] = useState(null);

  const onFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const onKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const question = e.target.value;
      const apiUrl = "http://localhost:3000/api/chat";

      const reqBody = { question: question };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();
      setAnswer(data);
      e.target.value = "";
    }
  };

  const toggleCollapse = (index) => {
    const sourceDocuments = [...answer.sourceDocuments];
    sourceDocuments[index].open = !sourceDocuments[index].open;
    setAnswer({ ...answer, sourceDocuments });
  };

  return (
    <div>
      <Head>
        <title>PDF Question and Answer</title>
        <meta name="description" content="Ask questions about your PDF" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        {!pdfFile && (
          <div>
            <label htmlFor="upload-button" className={styles.uploadLabel}>
              Upload PDF
            </label>
            <input
              type="file"
              id="upload-button"
              className={styles.uploadInput}
              accept=".pdf"
              onChange={onFileChange}
            />
          </div>
        )}
        {pdfFile && (
          <>
            <input
              type="text"
              className={styles.textBox}
              placeholder="Type your question and press Enter"
              onKeyDown={onKeyPress}
            />
            {answer && (
              <div>
                <p>{answer.text}</p>
                {answer.sourceDocuments.map((doc, index) => (
                  <div key={index} className={styles.collapsibleContainer}>
                    <button
                      className={styles.collapsibleButton}
                      onClick={() => toggleCollapse(index)}
                    >
                      Document {index + 1}
                    </button>
                    {doc.open && (
                      <p className={styles.collapsedContent}>{doc.pageContent}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
