import React from "react";
import { Select } from "antd";
import axios from "axios";

const MenuSelect = (props) => {
  const { Option } = Select;
  const [menuItems, setMenuItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/getallmenuitems")
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      });
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);

    props.func(value);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select Menu Items"
        onChange={handleChange}
        optionLabelProp="label"
      >
        {menuItems.map((item, index) => {
          return (
            <Option key={index} value={`${item.name}`} label={`${item.name}`}>
              <div className="demo-option-label-item">{item.name}</div>
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default MenuSelect;
