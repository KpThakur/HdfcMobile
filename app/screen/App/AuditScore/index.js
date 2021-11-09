import React, { useContext, useEffect, useState } from 'react'
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
    return (
        <>
            {isLoading && <Loader />}
            <AuditScore handleViewActionable={handleViewActionable} totalScore={totalScore} />
        </>
    )
}