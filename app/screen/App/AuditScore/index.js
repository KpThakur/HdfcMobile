import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import AuditScore from './component/AuditScore'
import {QuestionContext} from '../../../utils/QuestionContext'
import { apiCall } from '../../../utils/httpClient'
import apiEndPoints from '../../../utils/apiEndPoints'
export default function index({navigation}) {
    const [question,setquestion]=useContext(QuestionContext)
    const [score, setscore] = useState()
    const fetchScore=async()=>{
        const params={
            audit_id:question.audit_id
        }
        const response=await apiCall('POST',apiEndPoints.AUDIT_SCORE,params)
        setscore(response.data.score)
    }
    useEffect(() => {
        fetchScore()
    }, [])
    const handleViewActionable=()=>{
        navigation.navigate("ReviewAduit")
    }
    return (
        <AuditScore handleViewActionable={handleViewActionable} score={score}/>
    )
}
