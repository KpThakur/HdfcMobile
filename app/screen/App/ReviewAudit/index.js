import React, { useEffect, useState } from 'react'
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
    console.log(params.audit_id)

    const Details=async()=>{
        const param={
            audit_id:params.audit_id,
            type:2
        }
        console.log(param)
        const response=await apiCall('POST',apiEndPoints.GET_ACTIONABLE_DETAIL,param)
        console.log("REP",response.data);
        setbaseURL(response.data.base_url)
        setBM(response.data.BM)
        setRM(response.data.RMM)
    }
    useEffect(() => {
        Details()
    }, [])
    const handleSubmitReport=()=>{
        navigation.navigate("AuditSuccess")
    }
    return (
        <ReviewAuit handleSubmitReport={handleSubmitReport}
        BM={BM} RM={RM}
        bmDropDown={bmDropDown} setbmDropDown={setbmDropDown}
        baseURL={baseURL}
        rmDropDown={rmDropDown} setrmDropDown={setrmDropDown}
        />
    )
}
