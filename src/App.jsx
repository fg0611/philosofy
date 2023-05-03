import { useEffect, useState } from "react";
import { Button, FormSelect } from "react-bootstrap";
import loader from "./assets/loader.gif";

const URLPlugin = "http://localhost:8000";

function App() {
  const [printers, setprinters] = useState([]);
  const [selected, setselected] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(URLPlugin + "/printers", { signal: signal })
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setprinters(res);
          setloading(false);
        }, 1000);
      })
      .catch((err) => setError(err));
  }, []);

  const printSome = async (printer) => {
    setloading(true);
    const response = await (
      await fetch(`${URLPlugin}/print/${printer}`)
    ).json();
    if (response) {
      console.log(response);
    }
    setloading(false);
  };

  const handleChange = (event) => {
    setselected(event.target.value);
  };

  return (
    <div
      className="d-flex vw-100 vh-100 justify-content-center align-items-center"
      style={{ background: "#0f2026" }}
    >
      <div className="d-flex flex-column gap-4 w-50 p-3">
        {loading && (
          <>
            <p className="text-center text-white">
              {printers?.length ? "printing..." : "fetching devices..."}
            </p>
            <img className="" src={loader} loading="lazy" />
          </>
        )}
        {error?.length && <p>{error}</p>}
        {!loading && !error && (
          <>
            <FormSelect value={selected} onChange={handleChange}>
              <option>Select a printer</option>
              {printers?.length &&
                printers.map((p) => <option key={p.name}>{p.name}</option>)}
            </FormSelect>
            <Button
              onClick={async () => {
                selected?.length && (await printSome(selected));
              }}
            >
              PRINT
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
