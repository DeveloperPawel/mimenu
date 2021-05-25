import React from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import QRCode from "qrcode.react";
import { Calendar, Badge } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const PreviewModal = (props) => {
  const [visible, setVisible] = React.useState(false);
  const router = useRouter();
  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  function getListData(value) {
    let listData = [];

    let dateArray = [];
    for (let index = 0; index < props.orders.length; index++) {
      dateArray.push(props.orders[index].date);
    }
    let string = value.date();
    let string2 = string.toString();

    if (dateArray.includes(string2)) {
      for (let index = 0; index < props.orders.length; index++) {
        if (props.orders[index].date === string2) {
          if (props.orders[index].bool1) {
            listData.push({ type: "success", content: "meal 1" });
          } else {
            listData.push({ type: "warning", content: "meal 1" });
          }

          if (props.orders[index].bool2) {
            listData.push({ type: "success", content: "meal 2" });
          } else {
            listData.push({ type: "warning", content: "meal 2" });
          }

          if (props.orders[index].bool3) {
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

  function patientLink() {
    router.push(`/patient/${props.link}`);
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open
      </Button>
      <Modal
        title="Modal"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
        width={props.type === "calendar" ? 1000 : 600}
      >
        {props.type === "qr" ? (
          <>
            <QRCode
              value="http://facebook.github.io/react/" /** props.imageUrl */
            />
            <Button type="link" onClick={patientLink}>
              Patient Link
            </Button>
          </>
        ) : null}
        {props.type === "calendar" ? (
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default PreviewModal;
