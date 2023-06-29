import { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";
import axios from "axios";

const Scanner = () => {
  const [decodedResults, setDecodedResults] = useState([]);
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    axios
      .post("https://www.fluxqr.com/", {code: decodedResult})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    <div
      className="d-flex flex-column gap-4 p-4 vw-100 vh-100 align-items-center text-white"
      style={{ background: "#0f2026" }}
    >
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      <ResultContainerPlugin results={decodedResults} />
    </div>
  );
};
export default Scanner;
