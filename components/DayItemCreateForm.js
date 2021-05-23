import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import MenuSelect from "../components/MenuSelect";
import axios from "axios";

const DayItemCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [activeItems1, setActiveItems1] = useState([]);
  const [activeItems2, setActiveItems2] = useState([]);
  const [activeItems3, setActiveItems3] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/getallmenuitems")
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      });
  }, []);

  const setDayItem = (value) => {
    let newMenuItems = [];
    let indexArray = [];

    for (let index = 0; index < menuItems.length; index++) {
      for (let i = 0; i < value.length; i++) {
        if (menuItems[index].name === value[i]) {
          indexArray.push(index);
        }
      }
    }

    indexArray.forEach((index) => {
      newMenuItems.push(menuItems[index]);
    });

    return newMenuItems;
  };

  if (loading) {
    return <p>Day create loading...</p>;
  }

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
            values.menu1 = setDayItem(activeItems1);
            values.menu2 = setDayItem(activeItems2);
            values.menu3 = setDayItem(activeItems3);
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
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the name of the menuitem!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="breakfast" label="Breakfast">
          <MenuSelect func={setActiveItems1} />
        </Form.Item>

        <Form.Item name="lunch" label="Lunch">
          <MenuSelect func={setActiveItems2} />
        </Form.Item>

        <Form.Item name="dinner" label="Dinner">
          <MenuSelect func={setActiveItems3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DayItemCreateForm;
