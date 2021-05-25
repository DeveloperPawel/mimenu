import React from "react";
import { Context } from "../../../context/index";
import { useRouter } from "next/router";
import axios from "axios";

const index = () => {
  const router = useRouter();
  const { index } = router.query;

  const [loading, setLoading] = React.useState(true);
  const [patientList, setPatientList] = React.useState([]);
  const [dayMenu, setDayMenu] = React.useState({});

  const { state, dispatch } = React.useContext(Context);
  const { user } = state;

  let dayObj = {};

  React.useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  React.useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    await axios
      .get("http://localhost:8000/api/getallpatients")
      .then((response) => {
        // setPatientList(response.data);
        dayObj = createMenuDay(response.data);
        setDayMenu(dayObj);
      });

    setLoading(false);
  };

  //loop through all the Patients
  //find the days that match the index
  //display the orders
  const createMenuDay = (patientList) => {
    let day = {
      menu1: [],
      menu2: [],
      menu3: [],
    };
    console.log("patient list", JSON.stringify(patientList, null, 4));
    for (let i = 0; i < patientList.length; i++) {
      for (let j = 0; j < patientList[i].menuOrders.length; j++) {
        if (index === patientList[i].menuOrders.date) {
          day.menu1.push(patientList[i].menuOrders[j].menu1);
          day.menu2.push(patientList[i].menuOrders[j].menu2);
          day.menu3.push(patientList[i].menuOrders[j].menu3);
        }
      }
    }

    return day;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return <div>{JSON.stringify(dayMenu, null, 4)}</div>;
};

export default index;
