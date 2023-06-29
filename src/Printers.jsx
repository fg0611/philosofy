/*global chrome*/
import { useState } from "react";

function PrinterList() {
  const [printers, setPrinters] = useState([]);

  const handlePrinters = async () => {
    var printersFound =
      await chrome?.printerProvider?.onGetPrintersRequested.addListener(
        (resultCallback) => {
          resultCallback(printers);
        }
      );
    if (printersFound) {
      console.log(printersFound);
    }
  };

  return (
    <div
      className="d-flex flex-column gap-4 p-4 vw-100 vh-100 justify-content-start align-items-center text-white"
      style={{ background: "#0f2026" }}
    >
      <button onClick={handlePrinters}>Fetch Printers</button>
      <ul>
        {printers.map((printer) => (
          <li key={printer.id}>{printer.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PrinterList;
