import * as AlertMessage from "../../utilities/constants/AlertMessage";
function getHandledDataRender(origin) {
  return {
    username: {
      title: "Tên đăng nhập",
      value: origin.username,
    },
    id: {
      value: origin.id,
    },
    firstName: {
      value: origin.first_name,
      title: "Tên",
      type: "text",
      validateType: "string",
      errorMessage: AlertMessage.NAME_INVALID,
    },
    lastName: {
      value: origin.last_name,
      title: "Họ",
      type: "text",
      validateType: "string",
      errorMessage: AlertMessage.NAME_INVALID,
    },
    email: {
      title: "Email",
      value: origin.email,
      type: "text",
      validateType: "email",
      errorMessage: AlertMessage.EMAIL_INVALID,
    },
    birthday: {
      value: new Date(origin.profile.birthday).toLocaleDateString("es-CL"),
      title: "Ngày sinh",
      type: "date",
      validateType: null,
      errorMessage: "",
    },
    address: {
      value: origin.profile.address,
      title: "Địa chỉ",
      type: "text",
      validateType: null,
      errorMessage: "",
    },
    phone: {
      value: origin.profile.phone,
      title: "Số điện thoại",
      type: "tel",
      validateType: "phone",
      errorMessage: AlertMessage.PHONE_NUMBER_INVALID,
    },
    identification: {
      value: origin.profile.identify_card,
      title: "CMND",
      type: "tel",
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
      value: origin.profile.faculty.name,
    },
    grade: {
      title: "Lớp",
      value: origin.profile.class,
    },
    position: {
      title: "Chức vụ",
      value: origin.profile.position.name,
    },
    area: {
      title: "Khu vực",
      value: origin.profile.area.name,
    },
    room: {
      title: "Phòng hiện tại",
      value:
        typeof origin.profile.room === "undefined"
          ? "Trống"
          : origin.origin.name,
      type:
        typeof origin.profile.room === "undefined"
          ? "Trống"
          : origin.origin.type,
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
      birthday: data.birthday.value,
      faculty: data.faculty.value,
      gender: data.gender === "Nam" ? true : false,
      identify_card: data.identification.value,
      my_class: data.grade.value,
      phone: data.grade.phone,
    },
  };
}
function getEditEmployeeInfoState() {
  return {
    firstName: {
      value: "",
      isValid: true,
      isHidden: true,
    },
    lastName: {
      value: "",
      isValid: true,
      isHidden: true,
    },
    address: {
      value: "",
      isValid: true,
      isHidden: true,
    },
    email: {
      value: "",
      isValid: true,
      isHidden: true,
    },
    birthday: {
      value: "",
      isValid: true,
      isHidden: true,
    },
    identification: {
      value: "",
      isValid: true,
      isHidden: true,
    },
    phone: {
      value: "",
      isValid: true,
      isHidden: true,
    },
  };
}
export { getHandledDataRender, getRawDataRender, getEditEmployeeInfoState };
