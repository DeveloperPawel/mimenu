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
import DietCollectionPage from "../../../components/DietCollectionPage";
import { Context } from "../../../context/index";
import { useRouter } from "next/router";

//admin diet page
const index = () => {
  const [dietList, setDietList] = React.useState([]);
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
    getDiets();

    const interval = setInterval(() => {
      getDiets();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getDiets = async () => {
    await axios.get(`http://localhost:8000/api/getalldiet`).then((response) => {
      setDietList(response.data);
      setLoading(false);
    });
  };

  if (loading) {
    console.log(JSON.stringify(dietList, null, 4));
    return <p>loading...</p>;
  }
  return (
    <>
      <Layout>
        <Content>
          <h1>Diets</h1>
          <div className="site-card-wrapper">
            {dietList.map((item, index) => {
              return <Card key={index} object={item} />;
            })}
          </div>
          <Divider />
          <DietCollectionPage />
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default index;
