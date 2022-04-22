import React, { FormEvent, useState } from "react";
import api from "../../api";

const Login = () => {
  const initialState = { username: "", password: "", repeatPassword: "" };
  const [formState, setFormState] = useState(initialState);
  const { username, password, repeatPassword } = formState;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, id } = event.currentTarget;

    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try {
      const res = await api.register({username, password});
    } catch (error: any) {
      window.alert(error.message)
    }
    setFormState(initialState);
  };

  return (
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
      <div className="label-input">
        <button
          type="submit"
          disabled={!(username && password && password === repeatPassword)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
