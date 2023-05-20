import { useState } from "react";
import { Button } from "react-bootstrap";
import loader from "./assets/loader.gif";
import axios from "axios";

function Quotes() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const [quote, setquote] = useState("");
  const [loading, setloading] = useState(false);

  const getByAuthor = async () => {
    setloading(true);
    const response = await axios.get(baseUrl + "/name");
    if (response.status < 300 && response?.data?.message?.length > 0) {
      setloading(false);
      setquote(response.data.message);
    } else if (response.status > 300) {
      setloading(false);
      setError(`${response.status}`);
    } else {
      setloading(false);
    }
  };
  const getBySchool = async () => {
    setloading(true);
    const response = await axios.get(baseUrl + "/school");
    if (response.status < 300 && response?.data?.message?.length > 0) {
      setloading(false);
      setquote(response.data.message);
    } else if (response.status > 300) {
      setloading(false);
      setError(`${response.status}`);
    } else {
      setloading(false);
    }
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
