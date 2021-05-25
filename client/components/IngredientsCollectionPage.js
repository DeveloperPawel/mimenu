import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import axios from "axios";
import IngredientCreateForm from "./IngredientCreateForm";

const IngredientsCollectionPage = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    createIngredient(values);
    setVisible(false);
  };

  const createIngredient = async (values) => {
    let ingredient = {
      name: values.name,
      image: "./image.png",
    };
    console.log(JSON.stringify(ingredient, null, 4));
    await axios.post("http://localhost:8000/api/addingredient", ingredient);
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
      <IngredientCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default IngredientsCollectionPage;
