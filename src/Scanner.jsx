import { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";
import QRCode from "react-qr-code";
import axios from "axios";

const Scanner = () => {
  const [decodedResults, setDecodedResults] = useState([]);
  // const [imageData, setImageData] = useState(null);

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("TEXT::: ", decodedText);
    console.log("App [result]", decodedResult);
    // axios
    //   .post("https://www.fluxqr.com/", {code: decodedResult})
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  const handleGenerate = async () => {
    const svg = document.getElementsByTagName("svg");
    console.log(svg[decodedResults.length - 1]);
    const svgData = new XMLSerializer().serializeToString(svg[decodedResults.length - 1]);
    console.log(typeof svgData);
    console.log(svgData);
    const response = await axios.post(
      "http://127.0.0.1:8000/scanner",
      svgData,
      // { headers: { "Content-Type": "application/json" } }
      // { headers: { "Content-Type": "text/html" } }
      { headers: { "Content-Type": "image/svg+xml" } }
    );

    if (response) console.log(response);
  };

  return (
    <div
      className="d-flex flex-column gap-4 p-4 vw-100 vh-100 align-items-center"
      // className="d-flex flex-column gap-4 p-4 vw-100 vh-100 align-items-center text-white"
      // style={{ background: "#0f2026" }}
    >
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      <ResultContainerPlugin results={decodedResults} />
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      ></div>
      {decodedResults.length > 0 && (
        <div className="d-flex flex-column pb-4">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={decodedResults[decodedResults.length - 1].decodedText}
            viewBox={`0 0 256 256`}
          />
          <input className="mt-2" type="button" onClick={handleGenerate} value="SEND CONTENT" />
        </div>
      )}
    </div>
  );
};
export default Scanner;
