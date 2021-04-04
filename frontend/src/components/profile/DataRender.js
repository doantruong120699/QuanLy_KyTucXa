import * as AlertMessage from "../../utilities/constants/AlertMessage";
import moment from "moment";
function getHandledDataRender(origin) {
  return {
    firstName: {
      value: origin.first_name,
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    lastName: {
      value: origin.last_name,
      title: "Họ",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    email: {
      title: "Email",
      value: origin.email,
      type: "text",
      validateType: "email",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.EMAIL_INVALID,
    },
    birthday: {
      value: moment(new Date(origin.profile.birthday)).format("YYYY-MM-DD"),
      title: "Ngày sinh",
      type: "date",
      validateType: null,
      isValid: true,
      isHidden: true,
      errorMessage: "",
    },
    address: {
      value: origin.profile.address,
      title: "Địa chỉ",
      type: "text",
      validateType: null,
      isValid: true,
      isHidden: true,
      errorMessage: "",
    },
    phone: {
      value: origin.profile.phone,
      title: "Số điện thoại",
      type: "tel",
      validateType: "phone",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.PHONE_NUMBER_INVALID,
    },
    identification: {
      value: origin.profile.identify_card,
      title: "CMND",
      type: "tel",
      isValid: true,
      isHidden: true,
      validateType: "idCard",
      errorMessage: AlertMessage.IDENTIFICATION_INVALID,
    },
    gender: {
      title: "Giới tính",
      value: origin.profile.gender,
      field: {
        [true]: "Nam",
        [false]: "Nữ",
      },
    },
    faculty: {
      title: "Khoa",
      value: origin.profile.faculty ? origin.profile.faculty.name : null,
      isValid: true,
      isHidden: true,
    },
    grade: {
      title: "Lớp",
      value: origin.profile.my_class ? origin.profile.my_class.name : null,
      isValid: true,
      isHidden: true,
    },
  };
}
function getRawDataRender(data) {
  return {
    email: data.email.value,
    first_name: data.firstName.value,
    last_name: data.lastName.value,
    profile: {
      address: data.address.value,
      gender: data.gender.value,
      birthday: data.birthday.value,
      identify_card: data.identification.value,
      phone: data.phone.value,
    },
  };
}

export { getHandledDataRender, getRawDataRender };
