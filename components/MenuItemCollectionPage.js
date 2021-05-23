import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import axios from "axios";
import MenuItemCreateForm from "./MenuItemCreateForm";

const MenuItemCollectionPage = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    createMenuItem(values);
    props.func();
    setVisible(false);
  };

  const createMenuItem = async (values) => {
    let menuItem = {
      name: values.name,
      description: values.description,
      ingredient: [],
      image: "./image.png",
      note: "",
    };

    for (let index = 0; index < values.ingredients.length; index++) {
      menuItem.ingredient.push(values.ingredients[index]);
    }

    console.log(JSON.stringify(menuItem, null, 4));
    await axios.post("http://localhost:8000/api/addmenuitem", menuItem);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add
      </Button>
      <MenuItemCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default MenuItemCollectionPage;
