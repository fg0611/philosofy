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

  const handleGenerate = () => {
    // const svg = document.getElementsByTagName("svg");
    // console.log(svg[decodedResults.length - 1]);
    // const svgData = new XMLSerializer().serializeToString(
    //   svg[decodedResults.length - 1]
    // );
    // console.log(typeof svgData);
    // console.log(svgData);
    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");
    // const img = new Image();
    // img.onload = () => {
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   ctx.drawImage(img, 0, 0);
    //   const pngFile = canvas.toDataURL("image/png");
    //   console.log("pngFile");
    //   console.log(pngFile);
    // };
    // img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    // console.log("img.src");
    // console.log(img.src);
    const stringData = decodedResults[decodedResults.length - 1].decodedText;
    console.log(stringData);
    axios.get(
      `http://fluxqr.com/im?data=${stringData}`
      // `http://127.0.0.1:8000/im?data=${stringData}`,
      // stringData,
      // { headers: { "Content-Type": "application/json" } }
      // { headers: { "Content-Type": "text/html" } }
      // { headers: { "Content-Type": "text/plain" } }
      // { headers: { "Content-Type": "image/svg+xml" } }
    );

    // if (response) console.log(response);
  };

  return (
    <div
      className="d-flex flex-column gap-4 p-4 vw-100 vh-100 align-items-center"
      // className="d-flex flex-column gap-4 p-4 vw-100 vh-100 align-items-center text-white"
      // style={{ background: "#0f2026" }}
    >
      <div>
        <Html5QrcodePlugin
          fps={5}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </div>
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
          {/* <QRCode
            size={100}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={decodedResults[decodedResults.length - 1].decodedText}
            viewBox={`0 0 256 256`}
          /> */}
          <input
            className="mt-2"
            type="button"
            onClick={handleGenerate}
            value="SEND LATEST SCAN"
          />
        </div>
      )}
    </div>
  );
};
export default Scanner;
