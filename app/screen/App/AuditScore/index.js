import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import AuditScore from './component/AuditScore'
import { QuestionContext } from '../../../utils/QuestionContext'
import { apiCall } from '../../../utils/httpClient'
import apiEndPoints from '../../../utils/apiEndPoints'
import Loader from '../.../../../../utils/Loader'
export default function index({ navigation }) {
    const [question, setquestion] = useContext(QuestionContext)
    const [isLoading, setisLoading] = useState(false)
    const [totalScore, settotalScore] = useState()
    const fetchScore = async () => {
        setisLoading(true)
        const params = {
            audit_id: question.audit_id
        }
        const response = await apiCall('POST', apiEndPoints.AUDIT_SCORE, params)
        settotalScore(response.data)
        setisLoading(false)
    }
    useEffect(() => {
        fetchScore()
    }, [])

    const handleViewActionable = async () => {
        setisLoading(true)
        const params = {
            audit_id:question.audit_id,
            type:2
        }
        console.log('params: ', params);
        const response = await apiCall('POST', apiEndPoints.GET_ACTIONABLE_DETAIL, params)
        console.log('GET_ACTIONABLE_DETAIL: ', response);
        settotalScore(response.data)
        setisLoading(false)
        navigation.navigate("ReviewAduit")
    }
    // console.log("TST",totalScore)
    return (
        <>
            {isLoading && <Loader />}
            <AuditScore handleViewActionable={handleViewActionable} totalScore={totalScore} />
        </>
    )
}


/*
{
  "status": 200,
  "message": "success",
  "score": null,
  "curent_score_date": "2021-11-08T07:39:50.000Z",
  "previous": {
    "previous_score": 18,
    "previous_score_date": "2021-11-08T05:42:10.000Z"
  }
}
*/