import * as AlertMessage from "../AlertMessage";
function getRevenueRender() {
  return {
    name: {
      value: "",
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    type_revenue: {
      value: 1,
      title: "Loại",
    },
    description: {
      value: "",
      title: "Mô tả",
      type: "text",
    },
    amount: {
      value: "",
      title: "Tổng tiền",
      type: "text",
      validateType: "money",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.INCORRECT_FORMAT,
    },
    user_recieve: {
      value: 1,
      title: "Người thu",
    },
    time_recieve: {
      value: "",
      title: "Thời gian thu",
      type: "date",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.BLANK_NOT_ALLOWED,
    },
  };
}
function getExpenseRender() {
  return {
    name: {
      value: "",
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    type_expense: {
      value: 1,
      title: "Loại",
    },
    description: {
      value: "",
      title: "Mô tả",
      type: "text",
    },
    price: {
      value: "",
      title: "Tổng tiền",
      type: "text",
      validateType: "money",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.INCORRECT_FORMAT,
    },
    user_paid: {
      value: 1,
      title: "Người trả",
    },
    time_paid: {
      value: "",
      title: "Thời gian trả",
      type: "date",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.BLANK_NOT_ALLOWED,
    },
  };
}

export { getExpenseRender,getRevenueRender };
