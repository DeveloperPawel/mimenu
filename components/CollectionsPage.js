import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import CollectionCreateForm from "./CollectionCreateForm";
import axios from "axios";

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    values.password = createPassword();
    console.log("Received values of form: ", values);
    createPatient(values);
    setVisible(false);
  };

  const createPassword = () => {
    return `happyhappy123`;
  };

  const createPatient = async (values) => {
    let date = new Date();
    date = date.getDate();
    let num = parseInt(values.endDate) - date;

    let patient = {
      id: values.id,
      password: values.password,
      endDate: values.endDate,
      menuOrders: [],
    };

    for (let index = 0; index <= num; index++) {
      let order = {
        date: date + index,
        menu1: {},
        menu2: {},
        menu3: {},
        bool1: false,
        bool2: false,
        bool3: false,
      };
      patient.menuOrders.push(order);
    }

    console.log(JSON.stringify(patient, null, 4));
    await axios.post("http://localhost:8000/api/addpatient", patient);
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
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage;
