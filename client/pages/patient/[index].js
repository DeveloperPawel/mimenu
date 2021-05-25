import React from "react";
import { Calendar, Badge } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { Modal, Form, Space } from "antd";
import PatientSelect from "../../components/PatientSelect";
import { Context } from "../../context/index";

//patient calendar select
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

  const [menu1, setMenu1] = React.useState([]);
  const [menu2, setMenu2] = React.useState([]);
  const [menu3, setMenu3] = React.useState([]);

  const [restrictionList, setRestrictionList] = React.useState([]);

  const [dayList, setDayList] = React.useState({});

  const { state, dispatch } = React.useContext(Context);
  const { user } = state;
  const router = useRouter();
  const { index } = router.query;

  React.useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/getonepatient/${index}`)
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

  React.useEffect(() => {
    if (user === null) {
      router.push("/");
    } else {
      if (user.role !== "patient" && patient) {
        window.localStorage.removeItem("user");
        console.log("removing user and adding patient");
        window.localStorage.setItem("user", JSON.stringify(patient));
      }
    }
  }, [user]);

  function showModal() {
    setVisible(true);
  }

  function hideModal() {
    setVisible(false);
    setActiveItems1([]);
    setActiveItems2([]);
    setActiveItems3([]);
    setMenu1([]);
    setMenu2([]);
    setMenu3([]);
  }

  function createDailyMenu(day, mealNum, restriction, restrictionList) {
    let menu = [];
    let restrictionItems = [];

    //get the restriction ingredients
    for (let index = 0; index < restrictionList.length; index++) {
      if (restriction === restrictionList[index].name) {
        for (let i = 0; i < restrictionList[index].ingredient.length; i++) {
          restrictionItems.push(restrictionList[index].ingredient[i].name);
        }
        break;
      }
    }

    if (restrictionItems.length > 0) {
      let menuItemIngredientList = [];
      let intermediaryList = [];

      //create an array of arrays to compare against restriction
      for (let index = 0; index < day[`menu${mealNum}`].length; index++) {
        for (
          let i = 0;
          i < day[`menu${mealNum}`][index].ingredient.length;
          i++
        ) {
          intermediaryList.push(
            day[`menu${mealNum}`][index].ingredient[i].name
          );
        }
        menuItemIngredientList.push(intermediaryList);
        intermediaryList = [];
      }

      //check the index of each array and push the menu item (based on index)
      //if it does not contain the restricted item
      for (let index = 0; index < menuItemIngredientList.length; index++) {
        for (let i = 0; i < restrictionItems.length; i++) {
          //if the restriction item is in the array - break
          if (menuItemIngredientList[index].includes(restrictionItems[i])) {
            break;
          } else {
            if (i === restrictionItems.length - 1) {
              menu.push(day[`menu${mealNum}`][index]);
            }
          }
        }
      }
    } else {
      for (let index = 0; index < day[`menu${mealNum}`].length; index++) {
        menu.push(day[`menu${mealNum}`][index]);
      }
    }

    // console.log(`menu${mealNum}`, JSON.stringify(menu, null, 4));
    setLoading(false);
    return menu;
  }

  const setDayItem = (value, mealNum) => {
    let newMenuItem = {};
    let arrayIndex;

    for (let index = 0; index < day[`menu${mealNum}`].length; index++) {
      if (day[`menu${mealNum}`][index].name === value[0]) {
        arrayIndex = index;
      }
    }

    newMenuItem = day[`menu${mealNum}`][arrayIndex];

    return newMenuItem;
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
          if (patient.menuOrders[i].bool1) {
            listData.push({ type: "success", content: "meal 1" });
          } else {
            listData.push({ type: "warning", content: "meal 1" });
          }

          if (patient.menuOrders[i].bool2) {
            listData.push({ type: "success", content: "meal 2" });
          } else {
            listData.push({ type: "warning", content: "meal 2" });
          }

          if (patient.menuOrders[i].bool3) {
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

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    updatePatient(values);
    setVisible(false);
  };

  const updatePatient = async (values) => {
    let newPatient = {
      id: patient.id,
      password: patient.password,
      endDate: patient.endDate,
      restriction: patient.restriction,
      menuOrders: [],
      role: patient.role,
    };

    let newDay = {
      date: day.date,
      menu1: {},
      menu2: {},
      menu3: {},
      bool1: false,
      bool2: false,
      bool3: false,
    };

    if (!(typeof values.menu1.name == "undefined")) {
      newDay.menu1 = values.menu1;
      newDay.bool1 = true;
    }
    if (!(typeof values.menu2.name == "undefined")) {
      newDay.menu2 = values.menu2;
      newDay.bool2 = true;
    }
    if (!(typeof values.menu3.name == "undefined")) {
      newDay.menu3 = values.menu3;
      newDay.bool3 = true;
    }

    let bool = false;
    let arrayIndex;

    for (let index = 0; index < patient.menuOrders.length; index++) {
      if (day.date === patient.menuOrders[index].date) {
        bool = true;
        arrayIndex = index;

        if (
          !(typeof newDay.menu1.name == "undefined") &&
          !(typeof patient.menuOrders[index].menu1.name == "undefined")
        ) {
          newDay.menu1 = patient.menuOrders[index].menu1;
          newDay.bool1 = true;
        }
        if (
          !(typeof newDay.menu2.name == "undefined") &&
          !(typeof patient.menuOrders[index].menu2.name == "undefined")
        ) {
          newDay.menu2 = patient.menuOrders[index].menu2;
          newDay.bool2 = true;
        }
        if (
          !(typeof newDay.menu3.name == "undefined") &&
          !(typeof patient.menuOrders[index].menu3.name == "undefined")
        ) {
          newDay.menu3 = patient.menuOrders[index].menu3;
          newDay.bool3 = true;
        }
      }
    }

    //iterate over the objects without the selected day
    if (bool) {
      for (let index = 0; index < patient.menuOrders.length; index++) {
        if (index !== arrayIndex) {
          newPatient.menuOrders.push(patient.menuOrders[index]);
        }
      }
    }
    //add all the days
    else {
      for (let index = 0; index < patient.menuOrders.length; index++) {
        newPatient.menuOrders.push(patient.menuOrders[index]);
      }
    }

    let newPatientId;

    newPatient.menuOrders.push(newDay);
    console.log(`new patient`, JSON.stringify(newPatient, null, 4));
    await axios
      .post(
        `http://localhost:8000/api/updatepatient/${patient._id}`,
        newPatient
      )
      .then((response) => {
        newPatientId = response.data;
      });

    await axios
      .get(`http://localhost:8000/api/getonepatient/${newPatientId}`)
      .then((response) => {
        setPatient(response.data);
      });
  };

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

    if (day.date) {
      setDay(day);

      //set the date
      setDate(string2);

      setMenu1(createDailyMenu(day, 1, patient.restriction, restrictionList));
      setMenu2(createDailyMenu(day, 2, patient.restriction, restrictionList));
      setMenu3(createDailyMenu(day, 3, patient.restriction, restrictionList));

      showModal();
    }
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
              values.menu1 = setDayItem(activeItems1, 1);
              values.menu2 = setDayItem(activeItems2, 2);
              values.menu3 = setDayItem(activeItems3, 3);
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={() => {
          form.resetFields();
          hideModal();
        }}
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
                menu={menu1}
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
                menu={menu2}
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
                menu={menu3}
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
