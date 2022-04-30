import React, { FormEvent, useState } from "react";
import api from "../../api";
import { useUser } from "../../context/user.context";
// styles
import "./Login.scss";

const Login = () => {
  // get setUser and setToken from context
  const { setUser, setToken } = useUser();

  // form state and destructuring for ease of use
  const initialFormState = { username: "", password: "", repeatPassword: "" };
  const [formState, setFormState] = useState(initialFormState);
  const { username, password, repeatPassword } = formState;

  // boolean to set if it is login or register action
  const [login, setLogin] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, id } = event.currentTarget;

    setFormState({ ...formState, [id]: value });
  };

  const setUserAndToken = (token: string) => {
    setUser(username);
    localStorage.setItem("user", username);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = login
        ? await api.login({ username, password })
        : await api.register({ username, password });
      res.data.success
        ? setUserAndToken(String(res.data.token))
        : window.alert(res.data.message);
    } catch (error: any) {
      window.alert(error.message);
    }
    setFormState(initialFormState);
  };

  return (
    <div className="page">
      <h2>{login ? "Log In" : "Register"}</h2>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
            id="username"
            autoComplete="username"
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            id="password"
            autoComplete="new-password"
          />
        </div>
        {login ? (
          <></>
        ) : (
          <div className="label-input">
            <label htmlFor="repeatPassword">repeat password</label>
            <input
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              value={repeatPassword}
              id="repeatPassword"
              autoComplete="new-password"
            />
          </div>
        )}
        <div className="label-input">
          <button
            type="submit"
            disabled={
              login
                ? !(username && password)
                : !(username && password && password === repeatPassword)
            }
          >
            Submit
          </button>
        </div>
      </form>
      <div className="toggle-box">
        <p>{login ? "Need to Register?" : "Already Registered?"}</p>
        <button onClick={() => setLogin(!login)}>
          {login ? "Register" : "Log In"}
        </button>
      </div>
    </div>
  );
};

export default Login;
