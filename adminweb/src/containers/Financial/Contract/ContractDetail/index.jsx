import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import * as ROUTER from "../../../../utilities/constants/router";

import "./styles.css";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
export default function ContractDetail() {
  let history = useHistory();

  const { contractId } = useParams();
  const data = {
    start_date: "2021/7/17",
    end_date: "2021/10/17",
    room: {
      id: 5,
      name: 103,
      number_now: 0,
      typeroom: {
        id: 1,
        name: "Type 1",
        price: 200000,
        number_max: 8,
      },
      area: {
        id: 1,
        name: "A",
      },
      status: "A",
    },
    profile: {
      identityCard: "102170002",
      firstName: "Anh",
      lastName: "To",
      email: "anh_to@datahouse.com",
      address:
        " Số nhà 22/66 đường Nguyễn Hồng Quân,Thượng Lý, Hồng Bàng, Hải Phòng",
      phone: "0786662207",
      Faculty: "IT",
      my_class: "17T1",
    },
  };
  const handleClickBack = () => {
    history.push(ROUTER.ROUTE_MANAGE_FINANCIAL);
  };
  return (
    <div>
      <h1 id="title">Chi tiết hợp đồng</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickBack}
        style={{ marginBottom: "20px" }}
        startIcon={<ArrowBackIcon></ArrowBackIcon>}
      >
        Trở lại
      </Button>
      <table id="contract">
        <thead>
          <tr>
            <th style={{ backgroundColor: "green", border: "none" }}></th>
            <th style={{ backgroundColor: "green", border: "none" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Phòng</th>
            <th>{data.room.name}</th>
          </tr>
          <tr>
            <th>Khu</th>
            <th>{data.room.area.name}</th>
          </tr>
          <tr>
            <th>Loại phòng</th>
            <th>{data.room.typeroom.name}</th>
          </tr>
          <tr>
            <th>Giá Phòng</th>
            <th>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.room.typeroom.price)}
            </th>
          </tr>
          <tr>
            <th>Người Thuê</th>
            <th>{`${data.profile.lastName} ${data.profile.firstName}`}</th>
          </tr>
          <tr>
            <th>Mã Số Sinh Viên</th>
            <th>{data.profile.identityCard}</th>
          </tr>
          <tr>
            <th>Lớp</th>
            <th>{data.profile.my_class}</th>
          </tr>
          <tr>
            <th>Khoa</th>
            <th>{data.profile.Faculty}</th>
          </tr>
          <tr>
            <th>Địa chỉ liên lạc</th>
            <th>{data.profile.address}</th>
          </tr>
          <tr>
            <th>Email</th>
            <th>{data.profile.email}</th>
          </tr>
          <tr>
            <th>SĐT</th>
            <th>{data.profile.phone}</th>
          </tr>
          <tr>
            <th>Ngày Kí Hợp Đồng</th>
            <th>{moment(data.start_date).format("DD/MM/YYYY")}</th>
          </tr>
          <tr>
            <th>Ngày Hết Hạn Hợp Đồng</th>
            <th>{moment(data.end_date).format("DD/MM/YYYY")}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
