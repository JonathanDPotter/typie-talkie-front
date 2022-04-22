import React, { FormEvent, useEffect, useState } from "react";
// utils
import { useSockets } from "../../context/socket.context";
import { useUser } from "../../context/user.context";
// styles
import "./Home.scss";

const Home = () => {
  const { user, token } = useUser();
  // local state
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
    socket.emit("message", { name: user, message });
    setResponse([...response, { name: "Me", message }]);
    setMessage("");
  };

  useEffect(() => {
    user && socket.emit("new", { name: user, message: "" });
  }, [user]);

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="message">Enter a message </label>
          <input
            type="text"
            name="message"
            id="message"
            onChange={(event) => setMessage(event.currentTarget.value)}
            value={message}
            autoFocus
          />
          <button type="submit" value="" className="fa fa-bullhorn"></button>
        </div>
      </form>
      <div className="messages">
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
    </div>
  );
};

export default Home;
