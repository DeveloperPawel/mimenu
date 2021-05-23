import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const IngredientCard = (props) => {
  const { Meta } = Card;
  return (
    <>
      <Card
        style={{ width: 300 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          title={`${props.object.name}`}
          description="This is the description"
        />
      </Card>
    </>
  );
};

export default IngredientCard;
