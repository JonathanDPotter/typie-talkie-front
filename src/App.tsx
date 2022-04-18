import React, { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import config from "./config";
import { useSockets } from "./context/socket.context";

const App = () => {
  // local state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([
    { name: "name", message: "message" },
  ]);

  const { socket } = useSockets();

  socket.on("connection", (message) => {
    setResponse([...response, message]);
  });

  socket.on("message", (received) => {
    console.log("beep");
    setResponse([...response, received]);
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    socket.emit("message", { name, message });
    setResponse([...response, { name: "Me", message }]);
    setMessage("");
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
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
        <input type="submit" value="send" />
      </form>
      {response.map(
        (res, i) =>
          i > 0 && (
            <p
              key={`response ${i}`}
              className={res.name === "Me" ? "me" : "them"}
            >
              {res.name}:{res.message}
            </p>
          )
      )}
    </div>
  );
};

export default App;
