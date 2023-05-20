// import axios from "axios";
import wretch from "wretch";
import { useState } from "react";
import { Button, Input } from "antd";
const { TextArea } = Input;
import loader from "./assets/loader.gif";
// import TextArea from "antd/es/input/TextArea";

const baseUrl = import.meta.env.VITE_API_URL;
console.log(baseUrl);

const Gpt = () => {
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);

  const askTurbo = async (prompt) => {
    setloading(true);
    setError("");
    wretch(baseUrl + "/api/gpt")
      .post({ prompt })
      .json((response) => {
        if (response?.message) {
          setResponse(response.message);
          setloading(false);
        } else {
          setError("ERR");
          setloading(false);
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        setloading(false);
      });
  };
  const askDavinci = async (prompt) => {
    setloading(true);
    setError("");
    wretch(baseUrl + "/api/chat")
      .post({ prompt })
      .json((response) => {
        if (response?.message) {
          setResponse(response.message);
          setloading(false);
        } else {
          setError("ERR");
          setloading(false);
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        setloading(false);
      });
  };

  const hInput = (event) => {
    console.log("val:: ", event.target.value);
    setprompt(event.target.value);
  };

  return (
    <div
      className="d-flex flex-column gap-4 p-4 vw-100 vh-100 justify-content-start align-items-center text-white"
      style={{ background: "#0f2026" }}
    >
      {loading && (
        <>
          <p className="text-center text-white">thinking...</p>
          <img className="h-25" src={loader} loading="lazy" />
        </>
      )}
      {!loading && (
        <>
          <TextArea
            maxLength={100}
            style={{ width: "400px", height: "150px" }}
            onChange={hInput}
          />
          <div className="d-flex gap-3">
            <Button
              type="primary"
              onClick={() => {
                askTurbo(prompt);
              }}
            >
              Ask AI - turbo
            </Button>
            <Button
              type="primary"
              onClick={() => {
                askDavinci(prompt);
              }}
            >
              Ask AI - davinci (more expensive!)
            </Button>
          </div>

          <p>
            {response?.length > 0 && error?.length === 0 ? response : error}
          </p>
        </>
      )}
    </div>
  );
};

export default Gpt;
