import React from "react";
import { Calendar, Badge } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { Modal, Form, Space } from "antd";
import PatientSelect from "../components/PatientSelect";

const index = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(true);
  const [patient, setPatient] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [day, setDay] = React.useState({});

  const [activeItems1, setActiveItems1] = React.useState([]);
  const [activeItems2, setActiveItems2] = React.useState([]);
  const [activeItems3, setActiveItems3] = React.useState([]);

  const [restrictionList, setRestrictionList] = React.useState([]);

  const [dayList, setDayList] = React.useState({});

  const router = useRouter();

  React.useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/getonepatient/60a73616784a4b68b3b1e39b")
      .then((response) => {
        setPatient(response.data);
      });

    await axios.get("http://localhost:8000/api/getalldays").then((response) => {
      setDayList(response.data);
    });

    await axios.get("http://localhost:8000/api/getalldiet").then((response) => {
      setRestrictionList(response.data);
    });
    setLoading(false);
  }, []);

  function showModal() {
    setVisible(true);
  }

  function hideModal() {
    setVisible(false);
  }

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

  function getListData(value) {
    let listData = [];

    let dateArray = [];
    for (let index = 0; index < patient.menuOrders.length; index++) {
      dateArray.push(patient.menuOrders[index].date);
    }
    let string = value.date();
    let string2 = string.toString();

    if (dateArray.includes(string2)) {
      for (let i = 0; i < patient.menuOrders.length; i++) {
        if (patient.menuOrders[i].date === string2) {
          if (patient.menuOrders[i].menu1.length > 0) {
            listData.push({ type: "success", content: "meal 1" });
          } else {
            listData.push({ type: "warning", content: "meal 1" });
          }

          if (patient.menuOrders[i].menu1.length > 0) {
            listData.push({ type: "success", content: "meal 2" });
          } else {
            listData.push({ type: "warning", content: "meal 2" });
          }

          if (patient.menuOrders[i].menu1.length > 0) {
            listData.push({ type: "success", content: "meal 3" });
          } else {
            listData.push({ type: "warning", content: "meal 3" });
          }
        }
      }
    }
    return listData;
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  function onSelectCalled(value) {
    // console.log("onSelectCalled", value);
    let id;
    let day = {};
    let string = value.date();
    let string2 = string.toString();

    for (let index = 0; index < dayList.length; index++) {
      if (dayList[index].date === string2) {
        day = dayList[index];
        break;
      }
    }

    if (day) {
      setDay(day);
    }

    //set the date
    setDate(string2);

    showModal();
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Modal
        title="Choose a menu option"
        visible={visible}
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
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item name="breakfast" label="Breakfast">
            {day ? (
              <PatientSelect
                day={day}
                mealNum={1}
                restriction={patient.restriction}
                restrictionList={restrictionList}
                func={setActiveItems1}
              />
            ) : (
              "No menu items for today"
            )}
          </Form.Item>

          <Form.Item name="lunch" label="Lunch">
            {day ? (
              <PatientSelect
                day={day}
                mealNum={2}
                restriction={patient.restriction}
                restrictionList={restrictionList}
                func={setActiveItems2}
              />
            ) : (
              "No menu items for today"
            )}
          </Form.Item>

          <Form.Item name="dinner" label="Dinner">
            {day ? (
              <PatientSelect
                day={day}
                mealNum={3}
                restriction={patient.restriction}
                restrictionList={restrictionList}
                func={setActiveItems3}
              />
            ) : (
              "No menu items for today"
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={onSelectCalled}
      />
    </>
  );
};

export default index;
