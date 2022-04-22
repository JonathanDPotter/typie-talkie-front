import React, { FormEvent, useEffect, useState } from "react";
import { setEnvironmentData } from "worker_threads";
import { useSockets } from "../../context/socket.context";

const Home = () => {
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
          <button tabIndex={-1}></button>
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
          <button type="submit" value="" className="fa fa-bullhorn"></button>
        </div>
      </form>
      {response.map(
        (res, i) =>
          i > 0 && (
            <p
              key={`response ${i}`}
              id={res.name.toLowerCase()}
              className="message"
            >
              {res.name}:{res.message}
            </p>
          )
      )}
    </div>
  );
};

export default Home;
