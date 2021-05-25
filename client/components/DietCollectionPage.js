import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import axios from "axios";
import DietCreateForm from "./DietCreateForm";

const DietCollectionPage = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    createDiet(values);
    setVisible(false);
  };

  const createDiet = async (values) => {
    let diet = {
      name: values.name,
      ingredient: [],
    };

    for (let index = 0; index < values.ingredients.length; index++) {
      diet.ingredient.push(values.ingredients[index]);
    }

    console.log(JSON.stringify(diet, null, 4));
    await axios.post("http://localhost:8000/api/adddiet", diet);
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
      <DietCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default DietCollectionPage;
