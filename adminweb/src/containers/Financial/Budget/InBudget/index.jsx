import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  getRevenue,
  getRevenueType,
} from "../../../../redux/actions/financial";
import Pagination from "../../../../components/common/Pagination";
import Button from "../../../../components/common/Button";
import FormError from "../../../../components/common/FormError";
import InputField from "../../../../components/common/InputField";
import { getRevenueRender } from "../../../../utilities/constants/DataRender/budget";
import Popup from "reactjs-popup";
import queryString from "querystring";

export default function InBudget() {
  const [dataInBudget, setDataInBudget] = useState([]);

  const [revenueType, setType] = useState();

  const [newBudget, setBudget] = useState(getRevenueRender());

  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  useEffect(() => {
    let mouted = true;

    const paramsString = queryString.stringify(filter);

    getRevenue(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };

        const data = output.results.map((value, index) => {
          return {
            order: index + 1,
            type: value.type_revenue,
            description: value.description,
            createdBy:
              value.created_by.first_name + " " + value.created_by.last_name,
            price: value.amount,
            createdDate: moment(new Date(value.created_at)).format(
              "DD-MM-YYYY"
            ),
            receivedDate: moment(new Date(value.time_recieve)).format(
              "DD-MM-YYYY"
            ),
            userReceive: value.user_recieve,
          };
        });
        if (mouted) {
          setPagination(pagination);
          setDataInBudget(data);
        }
      }
    });

    getRevenueType((output) => {
      if (output) {
        if (mouted) {
          setType(output);
        }
      }
    });
    return () => (mouted = false);
  }, []);

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  function handleInput() {}
  return (
    <div>
      <div className="col col-full pd-16">
        <div className="pb-16">
          <Button
            type="normal-blue"
            content="Thêm"
            onClick={onOpen}
            isDisable={false}
          />
        </div>
        {dataInBudget && (
          <div>
            <table className="col col-full style-lg-box bg-color-white">
              <thead className="col col-full">
                <tr className="col col-full">
                  <th className="col col-15 bold-text pl-4 pr-4 pt-16 pb-16">
                    STT
                  </th>
                  <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                    Loại
                  </th>
                  <th className="col col-5 bold-text pl-4 pr-4 pt-16 pb-16">
                    Mô tả
                  </th>
                  <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                    Tạo bởi
                  </th>
                  <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                    Tổng tiền
                  </th>
                  <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                    Ngày tạo
                  </th>
                  <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                    Ngày nhận
                  </th>
                  <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                    Người nhận
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataInBudget.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="col col-full style-tr-hightlight"
                    >
                      <td className="col col-15 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        #{value.order}
                      </td>
                      <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        {value.type}
                      </td>
                      <td className="col col-5 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        {value.description}
                      </td>
                      <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        {value.createdBy}
                      </td>
                      <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        {value.price}
                      </td>
                      <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        {value.createdDate}
                      </td>
                      <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        {value.receivedDate}
                      </td>
                      <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                        {value.userReceive}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="col col-full pl-16 pr-16">
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
      <div>
        {revenueType && (
          <Popup open={open} closeOnDocumentClick onClose={() => onClose()}>
            <div className="col modal style-lg-box bg-color-white text-align-ct">
              <h2>Nhập thông tin thu chi</h2>
              <div className="col col-full mt-8">
                <div className="col col-full mt-8 pr-4">
                  <FormError
                    isHidden={newBudget.name.isHidden}
                    errorMessage={newBudget.name.errorMessage}
                  />
                  <InputField
                    name="name"
                    isValid={newBudget.name.isValid}
                    value={newBudget.name.value}
                    type={newBudget.name.type}
                    placeholder={newBudget.name.title}
                    onChange={handleInput}
                    autocomplete="off"
                  />
                </div>
              </div>
              <div className="col col-full mt-8">
                <div className="col pd-4">Loại thu</div>
                <select className="form-control" name="type_revenue">
                  {revenueType.map((value, index) => {
                    return (
                      <option key={index} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col col-full mt-8">
                <InputField
                  name="description"
                  isValid={true}
                  value={newBudget.description.value}
                  type={newBudget.description.type}
                  placeholder={newBudget.description.title}
                  onChange={handleInput}
                  autocomplete="off"
                />
              </div>
              <div className="col col-full mt-8">
                <FormError
                  isHidden={newBudget.amount.isHidden}
                  errorMessage={newBudget.amount.errorMessage}
                />
                <InputField
                  name="amount"
                  isValid={newBudget.amount.isValid}
                  value={newBudget.amount.value}
                  type={newBudget.amount.type}
                  placeholder={newBudget.amount.title}
                  onChange={handleInput}
                  autocomplete="off"
                />
              </div>
              <div className="col col-full mt-8">
                <div className="col pd-4">Người thu</div>
                <select className="form-control" name="user_recieve">
                  {revenueType.map((value, index) => {
                    return (
                      <option key={index} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col col-full mt-8">
                <FormError
                  isHidden={newBudget.amount.isHidden}
                  errorMessage={newBudget.amount.errorMessage}
                />
                <InputField
                  name="time_recieve"
                  isValid={newBudget.time_recieve.isValid}
                  value={newBudget.time_recieve.value}
                  type={newBudget.time_recieve.type}
                  placeholder={newBudget.time_recieve.title}
                  onChange={handleInput}
                  autocomplete="off"
                />
              </div>
              <div className="col col-full mt-24">
                <div className="col col-half">
                  <Button
                    type="normal-red"
                    content="HỦY"
                    isDisable={false}
                    onClick={onClose}
                  />
                </div>
                <div className="col col-half">
                  <Button
                    type="normal-ubg"
                    content="LƯU"
                    isDisable={false}
                    onClick={""}
                  />
                </div>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
}
