import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import InvitationView from "./components/Invitation";
import { LoadingContext } from "../../../utils/LoadingContext";
import { QuestionContext } from "../../../utils/QuestionContext";
import apiEndPoints from "../../../utils/apiEndPoints";
import { Share } from "react-native";
import { apiCall } from "../../../utils/httpClient";

const Invitation = () =>{
    const [isLoading, setisLoading] = useContext(LoadingContext);
    const [question, setquestion] = useContext(QuestionContext);
    const onShare = async () => {
        try {
            setisLoading(true)
            var params={audit_id:question?.audit_id}
            const response = await apiCall("POST", apiEndPoints.GETAAUDITSHAREINFO, params)
            if (response.status === 200) {
                var shareData = response.data?.data
                const result = await Share.share({
                    message:
                        `Link : ${shareData?.link}\nLogin id = ${shareData?.bm_code}\nPassword = ${shareData?.password}`
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            }
        } catch (error) {
            console.log("The error ==>>>",error)
            alert(error.message);
        }
        setisLoading(false)
    };
  
    
    return (
       <InvitationView
         onShare={onShare}
       />
    )
}
export default Invitation;

