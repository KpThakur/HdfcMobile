import React, { useContext, useEffect, useState } from 'react'
import ReviewAuit from './component/ReviewAuit'
import { apiCall } from '../../../utils/httpClient'
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from '../../../utils/Loader';
import {  useNavigation } from '@react-navigation/core'
import { UserContext } from '../../../utils/UserContext';
export default function index({route }) {
    const params=route.params
    const navigation =useNavigation()
    const [bmDropDown, setbmDropDown] = useState(false)
    const [rmDropDown, setrmDropDown] = useState(false)
    const [BM, setBM] = useState()
    const [baseURL, setbaseURL] = useState()
    const [RM, setRM] = useState()
    const [islaoding, setislaoding] = useState(false)
    const [userData,setuserData]=useContext(UserContext)
    const Details = async () => {
        const param = {
            audit_id: params.audit_id,
            type: 2
        }
        const response = await apiCall('POST', apiEndPoints.GET_ACTIONABLE_DETAIL, param)
        console.log("res:",response.data);
        setbaseURL(response.data.base_url)
        setBM(response.data.BM)
        setRM(response.data.RMM)
    }
    useEffect(() => {
        Details()
    }, [])
    const handleSubmitReport = async () => {
        setislaoding(true)
        const param = {
            audit_id: params.audit_id,
            audit_status: 3
        }
        const response = await apiCall('POST', apiEndPoints.CANCEL_AUDIT, param)
        if (response.status === 200)
            navigation.navigate("AuditSuccess")
        setislaoding(false)
    }
    const HandleBM = (actionable) => {
        if(actionable.length>0){
            props.setstartAudit(5)
            navigation.navigate("Actionable", { actionable: actionable, baseURL: baseURL,name:params.branch_manager })
        }
        else{
            alert("Branch Manager have not taken action!")
        }
    }
    const HandleRMM = (RM) => {
        navigation.navigate("Actionable", { RM: RM, baseURL: baseURL,name:userData.name })
    }
    return (
        <>
            {islaoding && <Loader />}
            <ReviewAuit handleSubmitReport={handleSubmitReport}
                BM={BM} RM={RM}
                HandleBM={HandleBM}
                HandleRMM={HandleRMM}
                bmDropDown={bmDropDown} setbmDropDown={setbmDropDown}
                baseURL={baseURL}
                params={params}
                rmDropDown={rmDropDown} setrmDropDown={setrmDropDown}
            />
        </>
    )
}
