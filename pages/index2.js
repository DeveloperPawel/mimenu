import React from "react";
import { Table, Tag, Space } from "antd";
import axios from "axios";
import Link from "next/link";
import { Button, Select, Input } from "antd";
import PreviewModal from "../components/PreviewModal";
import CollectionsPage from "../components/CollectionsPage";

export default function Home() {
  const { Column, ColumnGroup } = Table;
  const { Option } = Select;

  const [loading, setLoading] = React.useState(true);
  const [patientList, setPatientList] = React.useState([]);
  const [dietList, setDietList] = React.useState([]);
  const [patient, setPatient] = React.useState({});
  const [restriction, setRestriction] = React.useState("");
  const [duration, setDuration] = React.useState(false);
  const [endDate, setEndDate] = React.useState("");

  const columns = [
    {
      title: "Patient",
      dataIndex: "id",
    },
    {
      title: "Duration",
      dataIndex: "endDate",
      render: (text, record) => (
        <>
          {duration ? (
            <Input
              placeholder={`${record.endDate}`}
              onChange={(e) => setEndDate(e.target.value)}
            />
          ) : (
            record.endDate
          )}
          {!duration ? (
            <Button type="link" onClick={toggleDuration}>
              Edit
            </Button>
          ) : (
            <Button type="link" onClick={toggleDuration}>
              Cancel
            </Button>
          )}
        </>
      ),
    },
    {
      title: "Restriction",
      render: (text, record) => {
        return (
          <Select
            defaultValue={`${record.restriction}`}
            style={{ width: 100 }}
            onChange={handleChange}
          >
            <Option value={`${record.restriction}`} disabled>
              {record.restriction}
            </Option>
            {dietList.map((diet, index) => {
              let restriction = new String(record.restriction).valueOf();
              let dietname = new String(diet.name).valueOf();
              if (dietname !== restriction) {
                return (
                  <Option key={index} value={`${diet.name}`}>
                    {diet.name}
                  </Option>
                );
              }
            })}
          </Select>
        );
      },
    },
    {
      title: "Calendar",
      render: (text, record) => {
        return <PreviewModal type="calendar" orders={record.menuOrders} />;
      },
    },
    {
      title: "QR Code",
      render: (text, record) => {
        // return <PreviewModal orders={orders} />;
        return (
          <PreviewModal
            type="qr"
            imageUrl={`http://localhost:3000/login/${record._id}`}
          />
        );
      },
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              setPatient(record);
              updateButton(e);
            }}
          >
            Update
          </Button>
          <Link href={`http://localhost:8000/api/deletepatient/${record._id}`}>
            <a>Delete</a>
          </Link>
        </Space>
      ),
    },
  ];

  React.useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/getallpatients")
      .then((response) => {
        setPatientList(response.data);
      });

    await axios.get("http://localhost:8000/api/getalldiet").then((response) => {
      setDietList(response.data);
    });
    setLoading(false);
  }, []);

  function handleChange(value) {
    // console.log(`selected ${value}`);
    setRestriction(value);
  }

  const toggleDuration = () => {
    setDuration(!duration);
  };

  const openModal = (menuOrders) => {
    <PreviewModal orders={menuOrders} />;
  };

  const updatePatient = async (object) => {
    let link = `http://localhost:8000/api/updatepatient/${object._id}`;

    await axios.post(link, object);
  };

  const createPatient = async (object) => {
    let link = `http://localhost:8000/api/addpatient`;

    await axios.post(link, object);
  };

  const updateButton = (e) => {
    e.preventDefault();

    updatePatient(patient);
    setPatient({});
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  if (loading) {
    console.log(JSON.stringify(patientList, null, 4));
    console.log(JSON.stringify(dietList, null, 4));
    return <div>Loading...</div>;
  }

  return (
    <>
      <CollectionsPage />
      <Table columns={columns} dataSource={patientList} onChange={onChange} />
    </>
  );
}
