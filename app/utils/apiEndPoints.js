export default {
  // Auth Flow
  GENERATE_TOKEN: "/api/v1/tokenGenrate",
  REGISTRATION_SIGN_UP: "/api/v1/userAuth/user_signup",
  USERLOGIN:"/api/v1/userAuth/userLogin",

  PROFILE_UPDATE:"/api/v1/userAuth/updateEmpProfile",

  GET_CITY_BRANCH:"/api/v1/service/getBranchCity",
  GET_BRANCH_NAME:"/api/v1/service/getBranchName",
  GET_MANAGER_NAME:"/api/v1/service/getBranchManagerName",
  CREATE_AUDIT:"/api/v1/audit/auditCreate",
  GET_AUDIT_LIST:"/api/v1/audit/getAuditList",
  CANCEL_AUDIT:"/api/v1/audit/auditStatusUpdate"
  // CHECK_MOBLIE: "/api/customersignup/CheckMobile",
  // LOGIN: "/api/customersignup/loginCustomer",
  // FORGOT_PASSWORD: "/api/customer/forgotPassCustomer",
  // PASSWORD_UPDATE: "/api/customer/passwordUpdate",
  // VERIFY_REQUEST_COOK: "/api/customer/Requestcook",
}