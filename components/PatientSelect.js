import React from "react";
import { Select } from "antd";
import axios from "axios";

const PatientSelect = (props) => {
  const { Option } = Select;
  const [days, setDays] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const [restrictionList, setRestrictionList] = React.useState([]);
  let acceptedMenuItems = [];
  // needed props
  // day
  // mealNum
  // patient

  // acceptedMenuItems = createDailyMenu(
  //   props.day,
  //   props.mealNum,
  //   props.restriction,
  //   props.restrictionList
  // );

  React.useEffect(async () => {
    // await axios.get("http://localhost:8000/api/getalldays").then((response) => {
    //   setDays(response.data);
    // });
    // await axios.get("http://localhost:8000/api/getalldiet").then((response) => {
    //   setRestrictionList(response.data);
    // });
    // acceptedMenuItems = createDailyMenu(
    //   props.day,
    //   props.mealNum,
    //   props.restriction,
    //   props.restrictionList
    // );
    // console.log(
    //   "use effect menu items",
    //   JSON.stringify(acceptedMenuItems, null, 4)
    // );
    //   setLoading(false);
    acceptedMenuItems = createDailyMenu(
      props.day,
      props.mealNum,
      props.restriction,
      props.restrictionList
    );
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);

    props.func(value);
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

      console.log(JSON.stringify(day[`menu${mealNum}`], null, 4));
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
          if (!menuItemIngredientList[index].includes(restrictionItems[i])) {
            menu.push(day[`menu${mealNum}`][index]);
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

  if (loading) {
    // console.log("menu items", JSON.stringify(acceptedMenuItems, null, 4));
    return <p>Loading...</p>;
  }

  return (
    <>
      {acceptedMenuItems[0] ? (
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="select ingredients"
          onChange={handleChange}
          optionLabelProp="label"
        >
          {/* {console.log(
            "inside the selection",
            JSON.stringify(acceptedMenuItems, null, 4)
          )} */}
          {acceptedMenuItems.map((item, index) => {
            return (
              <Option key={index} value={`${item.name}`} label={`${item.name}`}>
                <div className="demo-option-label-item">{item.name}</div>
              </Option>
            );
          })}
        </Select>
      ) : (
        "still loading"
      )}
    </>
  );
};

export default PatientSelect;
