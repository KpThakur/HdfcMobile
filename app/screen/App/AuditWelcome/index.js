import React, { useContext, useEffect, useState } from 'react';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import { QuestionContext } from '../../../utils/QuestionContext';
import AuditWelcomeScreenView from './component/AuditWelcomeScreen';

const AuditWelcomeScreen = ({navigation,route}) => {
    const [token, settoken] = useState()
    const [channelId, setchannelId] = useState()
    const [question, setquestion] = useContext(QuestionContext)
    useEffect(() => {
        _agoraToken()
    }, [])
    const handleStartAudit=()=>{
        navigation.navigate("QuestionScreen",{token:token,channelId:channelId})
    }
    console.log("wel ques",question)
    const _agoraToken = async () => {
        console.log("AGORA API WORKI")
        try {
            const params = {
                audit_id: route.params.audit_id,
            }
            const response = await apiCall("POST", apiEndPoints.AGORA_TOKEN, params)
            console.log("AGORA RES:",response.data.data)
            if (response.status === 200) {
                settoken(response.data.data.token)
                setchannelId(response.data.data.channel)
            }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }
    return (<AuditWelcomeScreenView handleStartAudit={handleStartAudit}/>)
}
export default AuditWelcomeScreen;
