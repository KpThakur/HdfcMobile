import React, { useContext, useEffect, useState } from 'react'
import ReviewAuit from './component/ReviewAuit'
import {apiCall} from '../../../utils/httpClient'
import apiEndPoints from "../../../utils/apiEndPoints";
export default function index({navigation,route}) {
    const params=route.params
    const [bmDropDown, setbmDropDown] = useState(false)
    const [rmDropDown, setrmDropDown] = useState(false)
    const [BM, setBM] = useState()
    const [baseURL, setbaseURL] = useState()
    const [RM, setRM] = useState()
    console.log(params)

    const Details=async()=>{
        const param={
            audit_id:params.audit_id,
            type:2
        }
        const response=await apiCall('POST',apiEndPoints.GET_ACTIONABLE_DETAIL,param)
        setbaseURL(response.data.base_url)
        setBM(response.data.BM)
        setRM(response.data.RMM)
    }
    useEffect(() => {
        Details()
    }, [])
    const handleSubmitReport=async()=>{
        // console.log("PARMAS",param)
        const param = {
            audit_id: params.audit_id,
            audit_status: 3
        }
        console.log("PARMAS",param)
        const response = await apiCall('POST', apiEndPoints.CANCEL_AUDIT, param)
        console.log("RES REVIEQW",response)
        if (response.status === 200)
            navigation.navigate("AuditSuccess")
    }
    return (
        <ReviewAuit handleSubmitReport={handleSubmitReport}
        BM={BM} RM={RM}
        bmDropDown={bmDropDown} setbmDropDown={setbmDropDown}
        baseURL={baseURL}
        params={params}
        rmDropDown={rmDropDown} setrmDropDown={setrmDropDown}
        />
    )
}
