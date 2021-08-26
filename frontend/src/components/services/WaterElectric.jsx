import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { getListBill } from "../../redux/actions/service";
import Pagination from "../common/Pagination";
import { month } from "../../utilities/constants/titles";
import Loader from "../common/Loader";

const WaterElectric = () => {
  const [listBill, setListBill] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const loader = useSelector((state) => state.service.loading);

  const currentDate = new Date();

  const [filter, setFilter] = useState({
    page: 1,
    is_paid: "",
    month: 0,
    year: currentDate.getFullYear(),
  });

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  const year = [];

  for (
    var i = currentDate.getFullYear();
    i > currentDate.getFullYear() - 3;
    i--
  ) {
    year.push({ value: i, label: i.toString() });
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    const params = queryString.stringify(filter);

    getListBill(params, (output) => {
      const pagination = {
        page: output.current_page,
        page_size: output.page_size,
        totals: output.totals,
      };
      window.scrollTo(0, 0);
      setListBill(output.results);
      setPagination(pagination);
    });
  }, [filter]);

  return (
    <div className="style-background-container" style={{ height: "85vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          <div>
            <div className="col col-5 pd-8">
              <select
                name="is_paid"
                className="form-control"
                onChange={handleChange}
                value={filter.is_paid}
              >
                <option defaultChecked value="">
                  Tất cả
                </option>
                <option value={"True"}>Đã thanh toán</option>
                <option value={"False"}>Chưa thanh toán</option>
              </select>
            </div>
            <div className="col col-5 pd-8">
              <select
                name="month"
                className="form-control"
                value={filter.month}
                onChange={handleChange}
              >
                {month.map((value, index) => {
                  return (
                    <option key={index} value={value.value}>
                      {value.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col col-5 pd-8">
              <select
                name="year"
                className="form-control"
                value={filter.year}
                onChange={handleChange}
              >
                {year.map((value, index) => {
                  return (
                    <option key={index} value={value.value}>
                      {value.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {listBill && (
            <div>
              <div>
                <table className="col col-full style-lg-box bg-color-white">
                  <thead className="col col-full">
                    <tr className="col col-full">
                      <th className="col col-15 bold-text pl-4 pr-4 pt-16 pb-16">
                        Phòng
                      </th>
                      <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                        Chỉ số điện mới
                      </th>
                      <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                        Chỉ số nước mới
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Giá điện
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Giá nước
                      </th>
                      <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                        Đã thanh toán
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Người thanh toán
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Chi tiết
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBill?.map((bill, index) => {
                      return (
                        <tr
                          key={index}
                          className="col col-full style-tr-hightlight"
                        >
                          <td className="col col-15 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {bill?.room?.name}
                          </td>
                          <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {bill?.new_index_eclectrical}
                          </td>
                          <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {bill?.new_index_water}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {bill?.electrical_price}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {bill?.water_price}
                          </td>
                          <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {bill?.bill?.is_paid
                              ? "Đã thanh toán"
                              : "Chưa thanh toán"}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {bill?.bill?.sinhvien_paid?.first_name}{" "}
                            {bill?.bill?.sinhvien_paid?.last_name}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-20 pl-4 pr-4 pt-16 pb-16"></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col col-full">
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default WaterElectric;
