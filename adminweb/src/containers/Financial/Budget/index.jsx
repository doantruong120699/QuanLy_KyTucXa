import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./styles.css";

export default function Budget() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dataBudget = [
    {
      id: 1,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "20/04/2021",
    },
    {
      id: 2,
      type: 1,
      description: "Mua quạt",
      number: 2,
      price: 230000,
      createdDate: "20/03/2021",
    },
    {
      id: 3,
      type: 1,
      description: "Mua bàn",
      number: 2,
      price: 270000,
      createdDate: "22/04/2021",
    },
    {
      id: 4,
      type: 0,
      description: "Phòng A101 đóng tiền điện nước",
      number: 1,
      price: 200000,
      createdDate: "20/04/2021",
    },
    {
      id: 5,
      type: 0,
      description: "Phòng A102 đóng tiền điện nước",
      number: 1,
      price: 200000,
      createdDate: "21/04/2021",
    },
    {
      id: 6,
      type: 1,
      description: "Đóng tiền điện",
      number: 1,
      price: 2000000,
      createdDate: "01/05/2021",
    },
    {
      id: 7,
      type: 1,
      description: "Đóng tiền nước",
      number: 1,
      price: 500000,
      createdDate: "01/05/2021",
    },
    {
      id: 8,
      type: 1,
      description: "Trả lương nhân viên A",
      number: 1,
      price: 2000000,
      createdDate: "30/04/2021",
    },
    {
      id: 9,
      type: 1,
      description: "Trả lương nhân viên B",
      number: 1,
      price: 2000000,
      createdDate: "30/04/2021",
    },
    {
      id: 10,
      type: 1,
      description: "Trả lương nhân viên C",
      number: 1,
      price: 2000000,
      createdDate: "30/04/2021",
    },
    {
      id: 11,
      type: 1,
      description: "Mua đèn",
      number: 2,

      price: 200000,
      createdDate: "20/4/2021",
    },
    {
      id: 12,
      type: 1,
      description: "Mua đèn",
      number: 2,

      price: 200000,
      createdDate: "20/4/2021",
    },
    {
      id: 13,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "20/4/2021",
    },
    {
      id: 14,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "20/4/2021",
    },
    {
      id: 15,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "20/4/2021",
    },
  ];
  return (
    <div className="budget cmp">
      <div style={{ marginBottom: "20px" }}>Bảng thu chi của kí túc xá</div>
      <div className="budget-date-picker">
        <span style={{ fontSize: "16px" }}>Từ: </span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          dateFormat="dd/mm/yyyy"
          endDate={endDate}
          className={"budget-date-picker-calendar"}
        />
        <span style={{ fontSize: "16px", marginLeft: "20px" }}>Đến: </span>

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          dateFormat="dd/mm/yyyy"
          endDate={endDate}
          minDate={startDate}
          className={"budget-date-picker-calendar"}
        />
      </div>
      <div className={"budget-table"}></div>
    </div>
  );
}
