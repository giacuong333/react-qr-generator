import { useState, useEffect } from "react";
import styles from "./index.module.sass";

function Qr() {
  const [input, setInput] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function generateQr(code) {
      const qrUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${code}`;
      const response = await fetch(url);
      if (response.ok) {
        setUrl(qrUrl);
      } else {
        console.log("Failed to generate QR code.");
      }
    }

    if (qrCode) {
      generateQr(qrCode);
    }
  }, [qrCode]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleGenerate(e) {
    setQrCode(input);
  }

  return (
    <div className={styles.qrWrap}>
      <h1>QR Code Generator</h1>

      <div className={styles.inputBox}>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Enter text to encode..." value={input} onChange={handleInputChange} />
          <button type="button" className={styles.btn} onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>

      {url && (
        <div className={styles.outputBox}>
          <img src={url} alt="QR Code" />
          <a href={qrCode} role="button" download="QRCode" className={styles.btn}>
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default Qr;
