import React from "react";
import { Calendar, Badge } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import DayItemCollectionPage from "../../components/DayItemCollectionPage";
import { Context } from "../../context/index";

//admin calendar page
const index = () => {
  const [loading, setLoading] = React.useState(true);
  const [dayList, setDayList] = React.useState([]);

  const { state, dispatch } = React.useContext(Context);
  const { user } = state;

  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  React.useEffect(async () => {
    await axios.get("http://localhost:8000/api/getalldays").then((response) => {
      setDayList(response.data);
      setLoading(false);
    });
  }, []);

  function getListData(value) {
    let listData = [];

    let dateArray = [];
    for (let index = 0; index < dayList.length; index++) {
      dateArray.push(dayList[index].date);
    }
    let string = value.date();
    let string2 = string.toString();

    if (dateArray.includes(string2)) {
      for (let i = 0; i < dayList.length; i++) {
        if (dayList[i].date === string2) {
          if (dayList[i].menu1.length > 0) {
            listData.push({ type: "success", content: "meal 1" });
          } else {
            listData.push({ type: "warning", content: "meal 1" });
          }

          if (dayList[i].menu1.length > 0) {
            listData.push({ type: "success", content: "meal 2" });
          } else {
            listData.push({ type: "warning", content: "meal 2" });
          }

          if (dayList[i].menu1.length > 0) {
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

    let string = value.date();
    let string2 = string.toString();

    // for (let index = 0; index < dayList.length; index++) {
    //   if (dayList[index].date === string2) {
    //     id = dayList[index]._id;
    //     break;
    //   }
    // }

    // console.log(JSON.stringify(id, null, 4));

    if (string2) {
      router.push(`/cook/day/${string2}`);
    }
  }

  if (loading) {
    console.log(JSON.stringify(dayList, null, 4));
    return <p>Loading...</p>;
  }
  return (
    <>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={onSelectCalled}
      />
    </>
  );
};

export default index;
