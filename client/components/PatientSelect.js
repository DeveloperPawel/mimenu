import React from "react";
import { Select } from "antd";
import axios from "axios";

const PatientSelect = (props) => {
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`, JSON.stringify(value));

    props.func(value);
  }

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select one menu item"
        onChange={handleChange}
        optionLabelProp="label"
        autoClearSearchValue={false}
      >
        {props.menu.map((item, index) => {
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

export default PatientSelect;
