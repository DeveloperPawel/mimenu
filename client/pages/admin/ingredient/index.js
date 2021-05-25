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
import IngredientsCollectionPage from "../../../components/IngredientsCollectionPage";
import { Context } from "../../../context/index";
import { useRouter } from "next/router";

//admin ingredients page
const index = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { Header, Footer, Sider, Content } = Layout;
  const [refresh, setRefresh] = React.useState(false);
  const [refresh1, setRefresh1] = React.useState("");

  const { state, dispatch } = React.useContext(Context);
  const { user } = state;

  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  React.useEffect(() => {
    getIngredients();
    const interval = setInterval(() => {
      getIngredients();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getIngredients = async () => {
    await axios
      .get(`http://localhost:8000/api/getallingredients`)
      .then((response) => {
        setIngredients(response.data);
        setLoading(false);
      });
  };

  if (loading) {
    console.log(JSON.stringify(ingredients, null, 4));
    return <p>loading...</p>;
  }
  return (
    <>
      <Layout>
        <Content>
          <h1>ingredients</h1>
          <div className="site-card-wrapper">
            {ingredients.map((ingredient, index) => {
              return <Card key={index} object={ingredient} />;
            })}
          </div>
          <Divider />
          <IngredientsCollectionPage />
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};

export default index;

//return <Card key={index} object={ingredient} />;
