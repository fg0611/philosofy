// import axios from "axios";
import wretch from "wretch";
import { useState } from "react";
import { Button, Form, Input } from "antd";
const { TextArea } = Input;
import loader from "./assets/loader.gif";
// import TextArea from "antd/es/input/TextArea";

const baseUrl = import.meta.env.VITE_API_URL;
console.log(baseUrl);

const Gpt = () => {
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setloading] = useState(false);

  const onFinish = async (prompt) => {
    setloading(true);
    wretch(baseUrl + "/api/gpt")
      .post({ prompt })
      .json((response) => {
        if (response?.message) {
          setResponse(response.message);
        } else {
          setError("ERR");
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
    // const response = await axios.post(baseUrl + "/api/gpt", {prompt});
    // if (response.status < 300 && response?.data?.message?.length > 0) {
    //   setloading(false);
    //   setResponse(response.data.message);
    // } else if (response.status > 300) {
    //   setloading(false);
    //   setError(`${response.status}`);
    // } else {
    //   setloading(false);
    // }
  };

  return (
    <div
      className="d-flex flex-column gap-4 p-4 vw-100 vh-100 justify-content-center align-items-center text-white"
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
          <Form
            onFinish={onFinish}
            className="d-flex flex-column gap-2 justify-content-center align-items-center"
          >
            <Form.Item
              label={<label style={{ color: "red" }}>Write a prompt</label>}
              name="prompt"
              rules={[{ required: true, message: "Please pass a prompt" }]}
            >
              <TextArea type="textArea" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <p>
            {response?.length > 0 && error?.length === 0 ? response : error}
          </p>
        </>
      )}
    </div>
  );
};

export default Gpt;
