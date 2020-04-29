import React, { useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../CSS/authPage.css";

export default function AuthenticationPage() {
  const [credentials, setCredentials] = useState({});
  const [path, setPath] = useState();
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const auth = () => {
    axios
      .post(`${process.env.REACT_APP_DOMAIN_NAME}${path}`, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(credentials);

  const submitForm = (e) => {
    e.preventDefault();
    auth();
  };

  const form = () => {
    return (
      <form onSubmit={submitForm}>
        <input
          name="email"
          label="Email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          label="password"
          type="password"
          onChange={handleChange}
        />
        {path === "/register" ? (
          <>
            <input
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
            />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
          </>
        ) : (
          ""
        )}
        <button>send</button>
      </form>
    );
  };
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/auth"
          render={() => {
            setPath("/login");
            return (
              <div>
                <Link to="/auth/register">register</Link>
                <h1>login</h1>
                {form()}
              </div>
            );
          }}
        />
        <Route
          exact
          path="/auth/register"
          render={() => {
            setPath("/register");
            return (
              <div>
                <Link to="/auth">login</Link>
                <h1>register</h1>
                {form()}
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
}
