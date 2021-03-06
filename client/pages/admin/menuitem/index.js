import React from "react";
import { Layout } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Card from "../../../components/IngredientCard";
import { Col, Row } from "antd";
import { Divider } from "antd";
import { Button } from "antd";
import MenuItemCollectionPage from "../../../components/MenuItemCollectionPage";
import { Context } from "../../../context/index";
import { useRouter } from "next/router";

//admin menu items page
const index = () => {
  const [menuItems, setMenuItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { Header, Footer, Sider, Content } = Layout;
  const [refresh, setRefresh] = React.useState(true);

  const { state, dispatch } = React.useContext(Context);
  const { user } = state;

  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  React.useEffect(() => {
    getMenuItems();
    const interval = setInterval(() => {
      getMenuItems();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getMenuItems = async () => {
    await axios
      .get(`http://localhost:8000/api/getallmenuitems`)
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      });
  };

  if (loading) {
    console.log(JSON.stringify(menuItems, null, 4));
    return <p>loading...</p>;
  }
  return (
    <>
      <Layout>
        <Content>
          <h1>Menu Items</h1>
          <div className="site-card-wrapper">
            {menuItems.map((item, index) => {
              return <Card key={index} object={item} />;
            })}
          </div>
          <Divider />
          <MenuItemCollectionPage />
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default index;
