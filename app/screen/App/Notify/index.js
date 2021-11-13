import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { Share } from 'react-native';
import { QuestionContext } from "../../../utils/QuestionContext";
import NotifyView from './components/Notify';
const Notify = ({managerJoin,joined,setstartAudit}) =>{
    const navigation=useNavigation()
    const [question, setquestion] = useContext(QuestionContext)
    const [engine, setengine] = useState()
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'HDFC Bank Limited is an Indian banking and financial services company, headquartered in Mumbai, Maharashtra.HDFC Bank is India'
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
        } catch (error) {
            alert(error.message);
        }
    };
    const handleStartCall=()=>{
        setstartAudit(true)
        navigation.navigate("QuestionScreen")
    }
    return (
        <NotifyView
            onShare={onShare} handleStartCall={handleStartCall}
            question={question} managerJoin={managerJoin} joined={joined} setstartAudit={setstartAudit}
        />
    )
}
export default Notify;

