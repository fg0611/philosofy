import { useState } from "react";
import { Button } from "react-bootstrap";
import loader from "./assets/loader.gif";

function Quotes() {
  const baseUrl = "https://philosofyapi.vercel.app/";
  // const baseUrl = "https://philosofyapi.vercel.app";

  // const [printers, setprinters] = useState([]);
  // const [selected, setselected] = useState("");
  const [error, setError] = useState("");
  const [quote, setquote] = useState("");
  const [loading, setloading] = useState(false);

  const getByAuthor = async () => {
    setloading(true);
    fetch(baseUrl + "/name")
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setquote(res?.message);
          setloading(false);
        }, 1000);
      })
      .catch((err) => setError(err));
  };
  const getBySchool = () => {
    setloading(true);
    fetch(baseUrl + "/school")
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setquote(res?.message);
          setloading(false);
        }, 1000);
      })
      .catch((err) => setError(err));
  };

  return (
    <div
      className="d-flex flex-column gap-4 p-4 vw-100 vh-100 justify-content-center align-items-center text-white"
      style={{ background: "#0f2026" }}
    >
      {loading && (
        <>
          <p className="text-center text-white">fetching quote...</p>
          <img className="h-25" src={loader} loading="lazy" />
        </>
      )}
      {!loading && (
        <>
          <p>
            {quote.length > 0 && error?.length === 0
              ? quote
              : "Click below to find a quote"}
          </p>
          <p>{error.length > 0 ? error : ""}</p>
        </>
      )}
      <div className="d-flex gap-4">
        <Button onClick={getByAuthor}>By random author</Button>
        <Button onClick={getBySchool}>By random school</Button>
      </div>
    </div>
  );
}

export default Quotes;
