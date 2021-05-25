import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  ReadOutlined,
  PartitionOutlined,
  RestOutlined,
  ApiOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context/index";
import { useRouter } from "next/router";

const Navigation = () => {
  const [current, setCurrent] = React.useState("");

  const { state, dispatch } = React.useContext(Context);
  const { user } = state;

  const router = useRouter();

  React.useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    router.push("/");
  };

  console.log("user", JSON.stringify(user, null, 4));

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/" icon={<HomeOutlined />}>
        Home
      </Menu.Item>

      {user !== null && user.role === "Admin" ? (
        <>
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            <Link href="/admin">
              <a>Dashboard</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin/diet" icon={<ReadOutlined />}>
            <Link href="/admin/diet">
              <a>Diet</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin/ingredient" icon={<PartitionOutlined />}>
            <Link href="/admin/ingredient">
              <a>Ingredients</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin/menuitem" icon={<RestOutlined />}>
            <Link href="/admin/menuitem">
              <a>MenuItems</a>
            </Link>
          </Menu.Item>
        </>
      ) : null}

      {user !== null && user.role === "HealthProvider" ? (
        <Menu.Item key="/health" icon={<HomeOutlined />}>
          <Link href="/health">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
      ) : null}

      {user !== null && user.role === "patient" ? (
        <Menu.Item key="/patient" icon={<HomeOutlined />}>
          <Link href="/patient">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
      ) : null}

      {user !== null && user.role === "Cook" ? (
        <Menu.Item key="/cook" icon={<HomeOutlined />}>
          <Link href="/cook">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
      ) : null}

      {user === null ? (
        <>
          <Menu.Item
            key="/register"
            icon={<ApiOutlined />}
            className="float-right"
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Menu.Item>

          <Menu.Item
            key="/login"
            icon={<LoginOutlined />}
            className="float-right"
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Menu.Item>
        </>
      ) : null}

      {user !== null && (
        <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navigation;
