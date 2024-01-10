import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { Share } from 'react-native';
import apiEndPoints from "../../../utils/apiEndPoints";
import { apiCall } from "../../../utils/httpClient";
import Loader from "../../../utils/Loader";
import { QuestionContext } from "../../../utils/QuestionContext";
import NotifyView from './components/Notify';
import { LoadingContext } from "../../../utils/LoadingContext";
const Notify = ({managerJoin,joined,setstartAudit,bmJoined}) =>{
    const navigation=useNavigation()
    const [question, setquestion] = useContext(QuestionContext)
    const [engine, setengine] = useState()
    const [isLoading, setisLoading] = useContext(LoadingContext);
    // const [isLoading, setisLoading] = useState(false)
    const onShare = async () => {
        try {
            setisLoading(true)
            var params={audit_id:question?.audit_id}
            const response = await apiCall("POST", apiEndPoints.GETAAUDITSHAREINFO, params)
            if (response.status === 200) {
                var shareData = response.data?.data
                const result = await Share.share({
                    message:
                        `${shareData?.link}/
                        employee code =
                        ${shareData?.bm_code}/ password = ${shareData?.password}`
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
            alert(error.message);
        }
        setisLoading(false)
    };
    const handleStartCall=()=>{
        setstartAudit(1)
        // navigation.navigate("QuestionScreen")
    }
    return (
        <>
        {/* {isLoading && <Loader />} */}
        <NotifyView
            onShare={onShare} handleStartCall={handleStartCall}
            question={question} bmJoined={bmJoined} 
            managerJoin={managerJoin} joined={joined} setstartAudit={setstartAudit}
            />
        </>
    )
}
export default Notify;

