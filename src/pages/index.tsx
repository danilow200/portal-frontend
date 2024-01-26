import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("access_token"));
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          setMessage(data.message);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h3>Hi {message}</h3>
    </div>
  );
}
