import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  // local state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("fetching");

  useEffect(() => {
    const socket = io("http://localhost:1337", {
      extraHeaders: { "typie": "talkie" }
    });

    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setResponse("fetching")
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("welcome", (res) => setResponse(res));
  }, []);

  return (
    <div>
      <form action="submit">
        <div className="label-input">
          <label htmlFor="name">Enter name </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(event) => setName(event.currentTarget.value)}
            value={name}
          />
        </div>
        <div className="label-input">
          <label htmlFor="message">Enter a message </label>
          <input
            type="text"
            name="message"
            id="message"
            onChange={(event) => setMessage(event.currentTarget.value)}
            value={message}
          />
        </div>
      </form>
      <p>response: {response}</p>
    </div>
  );
};

export default App;
