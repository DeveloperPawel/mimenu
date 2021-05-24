import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Context } from "../context/index";
import { SyncOutlined } from "@ant-design/icons";

const register = () => {
  const [name, setName] = React.useState("ryan");
  const [email, setEmail] = React.useState("ryan@gmail.com");
  const [password, setPassword] = React.useState("cccccccc");
  const [loading, setLoading] = React.useState(false);

  const {
    state: { user },
  } = React.useContext(Context);

  const router = useRouter();

  React.useEffect(() => {
    if (user !== null) {
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
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
      });
      console.log("Register response", data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />

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
            disabled={!name || !email || !password || loading}
            className="btn btn-block btn-primary"
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default register;
