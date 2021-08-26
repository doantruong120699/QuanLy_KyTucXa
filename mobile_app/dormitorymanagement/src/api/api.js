const ENDPOINT = 'https://dutdormitory.tk/api/';

export const apiUrl = {
  LOGIN_URL: ENDPOINT + 'auth/login/',
  CHANGE_PASSWORD_URL: ENDPOINT + 'account/change-password/',
  CHANGE_PROFILE_URL: ENDPOINT + 'account/update-user-profile/',
  FORGOT_PASSWORD_URL: ENDPOINT + 'auth/forgot-password/',
  GET_CALENDAR_STAFF_URL: ENDPOINT + 'daily-schedules/',
  PROFILE_URL: ENDPOINT + 'account/get-user-profile/',
  GET_ALL_STUDENT_URL: ENDPOINT + 'students/get-all-student/',
  GET_ALL_STAFF_URL: ENDPOINT + 'staffs/get-all-staff/',
  GET_AREA: ENDPOINT + 'area/',
  GET_FACULTI: ENDPOINT + 'faculty/',
  GET_POSITION: ENDPOINT + 'position/',
  GET_CLASS: ENDPOINT + 'class/',
  NOTIFICATION_URL: ENDPOINT + 'notifications/',
  GET_ALL_ROOM_URL: ENDPOINT + 'rooms/get-all/',
  REGISTRATION_ROOM_URL_1_3: ENDPOINT + 'contracts/',
  REGISTRATION_ROOM_URL_2: ENDPOINT + 'all-in-contracts/',
  GET_DASHBOARD_URL: ENDPOINT + 'dashboard/',
  GET_PAYMENT_METHOD_URL: ENDPOINT + 'payment-method/',
  GET_DETAIL_ROOM_URL: ENDPOINT + 'rooms/',
  GET_SCHOOL_YEAR: ENDPOINT + 'school-year/',
  GET_WATER_ELECTRIC: ENDPOINT + 'students/water-electrical/'
};
