import React from "react";
import { Calendar, Badge } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { Typography, Divider } from "antd";

export default function index() {
  const [loading, setLoading] = React.useState(true);
  const [dayList, setDayList] = React.useState([]);
  const { Title, Paragraph, Text, Link } = Typography;
  const router = useRouter();

  return (
    <>
      <Title>M(i)Menu</Title>
      <Divider />
      <Paragraph>Empowering patients to digitally select food items.</Paragraph>
    </>
  );
}
