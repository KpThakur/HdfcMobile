export default {
  // Auth Flow
  GENERATE_TOKEN: "/api/v1/tokenGenrate",
  REGISTRATION_SIGN_UP: "/api/v1/userAuth/user_signup",
  USERLOGIN:"/api/v1/userAuth/userLogin",
  CHANGE_PASSWORD:"/api/v1/userAuth/changePassword",
  PROFILE_UPDATE:"/api/v1/userAuth/updateEmpProfile",

  GET_CITY_BRANCH:"/api/v1/service/getBranchCity",
  GET_BRANCH_NAME:"/api/v1/service/getBranchName",
  GET_MANAGER_NAME:"/api/v1/service/getBranchManagerName",
  CREATE_AUDIT:"/api/v1/audit/auditCreate",
  GET_AUDIT_LIST:"/api/v1/audit/getAuditList",
  CANCEL_AUDIT:"/api/v1/audit/auditStatusUpdate",
  QUESTION:'/api/v1/question/getQuestionList',
  SUBMIT_QUESTION:'/api/v1/question/submitQuestion',
  AUDIT_SCORE:'/api/v1/question/auditScore'
}