import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Card } from "antd";

const day = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [day, setDay] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(async () => {
    console.log("pid", pid);
    if (pid) {
      await axios
        .get(`http://localhost:8000/api/getoneday/${pid}`)
        .then((response) => {
          setDay(response.data);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    console.log(JSON.stringify(day, null, 4));
    console.log("is array?", Array.isArray(day.menu1));
    <p>Loading...</p>;
  }

  // add modal to create new menuItem

  return (
    <div>
      {pid && day && !loading ? (
        <>
          <h1>Date: {day.date}</h1>
          <h2>Breakfast</h2>
          {day.menu1.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.name}
                bordered={false}
                style={{ width: 300 }}
              >
                {item.ingredient.map((ingredient, index) => {
                  return <p>{ingredient.name}</p>;
                })}
              </Card>
            );
          })}
          <h2>Lunch</h2>
          {day.menu2.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.name}
                bordered={false}
                style={{ width: 300 }}
              >
                {item.ingredient.map((ingredient, index) => {
                  return <p>{ingredient.name}</p>;
                })}
              </Card>
            );
          })}
          <h2>Dinner</h2>
          {day.menu3.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.name}
                bordered={false}
                style={{ width: 300 }}
              >
                {item.ingredient.map((ingredient, index) => {
                  return <p>{ingredient.name}</p>;
                })}
              </Card>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default day;
