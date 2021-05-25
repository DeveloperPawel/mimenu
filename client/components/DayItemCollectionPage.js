import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import axios from "axios";
import DayItemCreateForm from "./DayItemCreateForm";

const DayItemCollectionPage = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    createDayItems(values);
    props.func();
    setVisible(false);
  };

  const createDayItems = async (values) => {
    let dayItems = {
      date: values.date,
      menu1: [],
      menu2: [],
      menu3: [],
    };

    for (let index = 0; index < values.menu1.length; index++) {
      dayItems.menu1.push(values.menu1[index]);
    }

    for (let index = 0; index < values.menu2.length; index++) {
      dayItems.menu2.push(values.menu2[index]);
    }

    for (let index = 0; index < values.menu3.length; index++) {
      dayItems.menu3.push(values.menu3[index]);
    }

    console.log(JSON.stringify(dayItems, null, 4));
    await axios.post("http://localhost:8000/api/addday", dayItems);
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
      <DayItemCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default DayItemCollectionPage;
