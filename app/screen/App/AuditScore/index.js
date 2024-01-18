import React, { useContext, useEffect, useState } from "react";
import AuditScore from "./component/AuditScore";
import { QuestionContext } from "../../../utils/QuestionContext";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../.../../../../utils/Loader";
import { Alert, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { LoadingContext } from "../../../utils/LoadingContext";
export default function Index(props) {
  const navigation = useNavigation();
  const [question, setquestion] = useContext(QuestionContext);
  const [isLoading, setisLoading] = useContext(LoadingContext);
  // const [isLoading, setisLoading] = useState(false);
  const [totalScore, settotalScore] = useState();
  const fetchScore = async () => {
    setisLoading(true);
    const params = {
      audit_id: question.audit_id,
    };
    const response = await apiCall("POST", apiEndPoints.AUDIT_SCORE, params);
    settotalScore(response.data);
    setisLoading(false);
  };
  useEffect(() => {
    fetchScore();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);
  const onBackPress = () => {
    navigation.navigate("Profile");
  };
  const startvideo = () => {
    navigation.navigate("VideoScreen", {auditId : question?.audit_id});
  };

  const handleViewActionable = async () => {
    setisLoading(true);
    const params = {
      audit_id: question.audit_id,
      type: 2,
    };

    const response = await apiCall(
      "POST",
      apiEndPoints.GET_ACTIONABLE_DETAIL,
      params
    );
    setisLoading(false);
    // props.setstartAudit(4)
    // navigation.navigate("ReviewAduit",{audit_id: question.audit_id,branch_manager:question.branch_manager})
    Alert.alert('Your Video is Uploaded and Audit is Complete !');
    navigation.navigate("ScheduleNewAuditScreen");
    // navigation.navigate("DashboardScreen");
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <AuditScore
        handleViewActionable={handleViewActionable}
        type={question?.audit_type}
        totalScore={totalScore}
        startvideo={startvideo}
      />
    </>
  );
}
