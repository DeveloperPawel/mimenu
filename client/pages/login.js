import React from "react";
import Link from "next/link";
import { Context } from "../context/index";
import { useRouter } from "next/router";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { SyncOutlined } from "@ant-design/icons";

const login = () => {
  const [email, setEmail] = React.useState("mike@gmail.com");
  const [password, setPassword] = React.useState("cccccccc");
  const [loading, setLoading] = React.useState(false);

  const { state, dispatch } = React.useContext(Context);
  const { user } = state;
  const router = useRouter();

  React.useEffect(() => {
    if (user !== null) {
      console.log("user is null");
      if (user.role === "patient") {
        router.push("/patient");
      } else if (user.role === "Admin") {
        router.push("/admin");
      } else if (user.role === "HealthProvider") {
        router.push("/health");
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:8000/api/login`, {
        email,
        password,
      });
      console.log("login response", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      //   if (user !== null) {
      //     if (user.role === "patient") {
      //       router.push("/patient");
      //     } else if (user.role === "Admin") {
      //       router.push("/admin");
      //     } else if (user.role === "HealthProvider") {
      //       router.push("/health");
      //     }
      //   }
      window.localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <button
            disabled={!email || !password || loading}
            className="btn btn-block btn-primary"
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
