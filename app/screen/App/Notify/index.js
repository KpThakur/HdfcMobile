import React from "react";
import { Share } from 'react-native';
import NotifyView from './components/Notify';
const Notify = ({navigation}) => {
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
        navigation.navigate("QuestionScreen")
    }
    return (
        <NotifyView
            onShare={onShare} handleStartCall={handleStartCall}
        />
    )
}
export default Notify;

