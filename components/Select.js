import React from "react";
import { Select } from "antd";
import axios from "axios";

const SelectBar = (props) => {
  const { Option } = Select;
  const [ingredients, setIngredients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/getallingredients")
      .then((response) => {
        setIngredients(response.data);
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
        placeholder="select ingredients"
        onChange={handleChange}
        optionLabelProp="label"
      >
        {ingredients.map((ingredient, index) => {
          return (
            <Option
              key={index}
              value={`${ingredient.name}`}
              label={`${ingredient.name}`}
            >
              <div className="demo-option-label-item">{ingredient.name}</div>
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default SelectBar;
