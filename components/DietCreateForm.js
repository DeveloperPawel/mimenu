import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import SelectBar from "../components/Select";
import axios from "axios";

const DietCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [activeIngredients, setActiveIngredients] = useState([]);

  const setIngredients = async (value) => {
    let newIngredients = [];
    let indexArray = [];
    let ingredients = [];

    await axios
      .get("http://localhost:8000/api/getallingredients")
      .then((response) => {
        ingredients = response.data;
      });

    for (let index = 0; index < ingredients.length; index++) {
      for (let i = 0; i < value.length; i++) {
        if (ingredients[index].name === value[i]) {
          indexArray.push(index);
        }
      }
    }

    indexArray.forEach((index) => {
      newIngredients.push(ingredients[index]);
    });

    return newIngredients;
  };

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            form.resetFields();
            values.ingredients = await setIngredients(activeIngredients);
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the menuitem!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="selection" label="Selection">
          <SelectBar func={setActiveIngredients} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DietCreateForm;
