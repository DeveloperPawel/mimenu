import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="id"
          label="Id"
          rules={[
            {
              required: true,
              message: "Please input the id of patient!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="endDate" label="Date of discharge">
          <Input type="textarea" />
        </Form.Item>
        {/* <Form.Item name="restriction" label="Restriction">
          <Select>
            {diets.map((diet, i) => {
              <Select.Option value={`${diet.name}`}>{diet.name}</Select.Option>;
            })}
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
