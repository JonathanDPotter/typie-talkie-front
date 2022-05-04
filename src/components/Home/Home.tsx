import React, { FormEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useBeforeunload } from "react-beforeunload";
// utils
import api from "../../api";
import { useSockets } from "../../context/socket.context";
import { useUser } from "../../context/user.context";
// styles
import "./Home.scss";

const Home = () => {
  const { user, token, setUser, setToken } = useUser();
  // local state
  const [users, setUsers] = useState<string[] | null>(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([
    { name: "name", message: "message", id: "id" },
  ]);

  const { socket } = useSockets();

  socket.on("connection", ({ name, message, id }) => {
    setResponse([...response, { name, message, id }]);
    setUsers(users);
  });

  socket.on("message", (received) => {
    setResponse([...response, received]);
  });

  socket.on("new", ({ users }) => {
    setUsers(users);
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    socket.emit("message", { name: user, message });
    setResponse([...response, { name: "Me", message, id: uuid() }]);
    setMessage("");
  };

  const removeUser = () => {
    setUser(null);
    localStorage.setItem("user", "");
    setToken(null);
    localStorage.setItem("token", "");
  };

  useEffect(() => {
    // users kept connecting multiple times until I added the setTimeout
    if (!socket.connected) window.setTimeout(() => socket.connect(), 500);
    socket.emit("new", { name: user });

    (async () => {
      if (token) {
        const valid = await api.validate(token);
        if (!valid.data.success) removeUser();
      }
    })();
    window.addEventListener("beforeunload", (event) => {
      event?.preventDefault();
      return "";
    });

    window.addEventListener("unload", () => socket.disconnect());

    return () => {
      setUsers(null);
      socket.disconnect();
      window.removeEventListener("beforeunload", (event) => {
        event?.preventDefault();
        return "";
      });
      window.removeEventListener("unload", () => socket.disconnect());
    };
  }, []);

  return (
    <div>
      <div className="current-users">
        <h2>Current Users</h2>
        {users && users.map((usr) => <p key={usr}>{usr}</p>)}
      </div>
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
              <p key={res.id} id={res.name.toLowerCase()} className="message">
                {res.name}:{res.message}
              </p>
            )
        )}
      </div>
    </div>
  );
};

export default Home;
