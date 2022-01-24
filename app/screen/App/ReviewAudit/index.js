import React, { useContext, useEffect, useState } from "react";
import ReviewAuit from "./component/ReviewAuit";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../utils/Loader";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../../../utils/UserContext";
export default function index({ route }) {
  const params = route.params;
  const navigation = useNavigation();
  const [bmDropDown, setbmDropDown] = useState(false);
  const [rmDropDown, setrmDropDown] = useState(false);
  const [BM, setBM] = useState();
  const [baseURL, setbaseURL] = useState();
  const [RM, setRM] = useState();
  const [islaoding, setislaoding] = useState(false);
  const [userData, setuserData] = useContext(UserContext);
  const [repo, setrepo] = useState();
  const Details = async () => {
    const param = {
      audit_id: params.audit_id,
      type: 2,
    };
    const response = await apiCall(
      "POST",
      apiEndPoints.GET_ACTIONABLE_DETAIL,
      param
    );
    setbaseURL(response.data.base_url);
    setBM(response.data.BM);
    setRM(response.data.RMM);
  };
  useEffect(() => {
    Details();
    getRepoStatus();
  }, []);
  const handleSubmitReport = async () => {
    setislaoding(true);
    const param = {
      audit_id: params.audit_id,
      audit_status: 3,
    };
    const response = await apiCall("POST", apiEndPoints.CANCEL_AUDIT, param);
    if (response.status === 200) navigation.navigate("AuditSuccess");
    setislaoding(false);
  };
  const HandleBM = (actionable,question_id,audit_id) => {
    if (actionable.length > 0) {
      navigation.navigate("Actionable", {
        actionable: actionable,
        baseURL: baseURL,
        question_id,
        audit_id,
        display_next:false,
        name: params.branch_manager,
      });
    } else {
      navigation.navigate("Actionable", {
        actionable: actionable,
        baseURL: baseURL,
        name: params.branch_manager,
        question_id,
        audit_id,
        display_next:false
      });
      // alert("Branch Manager have not taken action!");
    }
  };
  const HandleRMM = (RM,question_id,audit_id) => {
    navigation.navigate("Actionable", {
      RM: RM,
      baseURL: baseURL,
      question_id,
      audit_id,
      display_next:true
    });
  };
  const getRepoStatus = async () => {
    try {
      setislaoding(true);
      const param = {
        audit_id: params.audit_id,
      };
      const { data } = await apiCall("POST", apiEndPoints.REPO_STATUS, param);
      if (data.status === 200) {
        setrepo(data);
      }
      setislaoding(false);
    } catch (error) {
      setislaoding(false);
      console.log(error);
    }
  };
  return (
    <>
      {islaoding && <Loader />}
      <ReviewAuit
        handleSubmitReport={handleSubmitReport}
        BM={BM}
        RM={RM}
        HandleBM={HandleBM}
        HandleRMM={HandleRMM}
        bmDropDown={bmDropDown}
        setbmDropDown={setbmDropDown}
        baseURL={baseURL}
        params={params}
        rmDropDown={rmDropDown}
        repo={repo}
        setrmDropDown={setrmDropDown}

      />
    </>
  );
}
