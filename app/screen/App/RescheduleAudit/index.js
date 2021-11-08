import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { useContext } from 'react/cjs/react.development'
import apiEndPoints from '../../../utils/apiEndPoints'
import { EditAuditContext } from '../../../utils/EditAuditContext'
import { apiCall } from '../../../utils/httpClient'
import RescheduleAudit from './component/RescheduleAudit'
import Loader from '../.../../../../utils/Loader'
export default function index({ navigation }) {
    const [cityBranch, setcityBranch] = useState([])
    const [cityName, setCityName] = useState()
    const [branchDetail, setbranchDetail] = useState([])
    const [isLaoding, setisLaoding] = useState(false)
    const [citydropDown, setcitydropDown] = useState(false)
    const [branchName, setbranchName] = useState()
    const [branchNameDropDown, setbranchNameDropDown] = useState(false)
    const [branchManagerName, setbranchManagerName] = useState()
    const [cityId, setcityId] = useState()
    const [branchNameId, setbranchNameId] = useState()
    const [branchManagerId, setbranchManagerId] = useState()
    const [editAudit,seteditAudit]=useContext(EditAuditContext)
    useEffect(() => {
        getCityName()
        getBranchName(editAudit.city_id)
    }, [])
    const getCityName = async () => {
        try {
            setisLaoding(true)
            const response = await apiCall('POST', apiEndPoints.GET_CITY_BRANCH)
            if (response.status === 200) {
                setcityBranch(response.data.data)
                setisLaoding(false)
            }
            else
                console.log("Status Code:", response.status)

        } catch (error) {
            console.log(error)
        }
    }
    const handleSchedule = () => {
        navigation.navigate("DashboardScreen")
    }
    const handleSelectCity = (city_name, city_id) => {
        seteditAudit({...editAudit,city_id,city_name,branch_name:null,branch_id:null,branch_manager:null,branch_manager_id:null})
        setcitydropDown(!citydropDown)
        getBranchName(city_id)
    }
    const handleSelectBranch = (branch_name, branch_id) => {
        seteditAudit({...editAudit,branch_name,branch_id,branch_manager_id:null,branch_manager:null})
        setbranchNameDropDown(!branchNameDropDown)
        getManagerName(branch_id)
    }
    const getManagerName = async (branch_id) => {
        try {
            setisLaoding(true)
            const params = { branch_id }
            const response = await apiCall('POST', apiEndPoints.GET_MANAGER_NAME, params)
            if (response.status === 200) {
                seteditAudit({...editAudit,branch_manager:response.data.data[0].branch_manager,branch_manager_id:response.data.data[0].branch_manager_id,
                    branch_name:response.data.data[0].branch_name,branch_id:response.data.data[0].branch_id})
                    setisLaoding(false)
            }
            else
                console.log("Status Code:", response.status)

        } catch (error) {
            console.log(error)
        }
    }
    const getBranchName = async (city_id) => {
        try {
            const params = { city_id }
            const response = await apiCall('POST', apiEndPoints.GET_BRANCH_NAME, params)
            if (response.status === 200) {
                setbranchDetail(response.data.data)
            }
            else {
                console.log(response.status)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const ShowAlert = (message) => {
        Alert.alert(
            'Schedule Aduit',
            message,
        )
    }
    const validation = () => {
        if (!editAudit.city_id) {
            ShowAlert('Select City Name')
            return false
        }
        if (!editAudit.branch_id) {
            ShowAlert('Select Branch Name')
            return false
        }
        if(editAudit.audit_date<moment(moment()).format('DD-MM-YYYY'))
        {
            ShowAlert("You can't select previous date")
            return false
        }
        
        return true
    }
    const handleSumbit = async () => {
        const vaild = validation()
        if (vaild) {
            try {
                setisLaoding(true)
                const response = await apiCall('POST', apiEndPoints.EDIT_AUDIT, editAudit)
                // console.log(response,"SCHEDULE AUDIT")
                setisLaoding(false)
                if(response.status===200)
                {
                    navigation.navigate('DashboardScreen')
                }
            } catch (error) {
                console.log(error, "ERROR")
            }

        }
    }
    return (
        <>
        {isLaoding&& <Loader/>}
        <RescheduleAudit cityBranch={cityBranch}
            handleSchedule={handleSchedule}
            isLaoding={isLaoding}
            handleSelectCity={handleSelectCity}
            citydropDown={citydropDown}
            setcitydropDown={setcitydropDown}
            branchDetail={branchDetail}
            branchName={branchName}
            branchNameDropDown={branchNameDropDown}
            handleSelectBranch={handleSelectBranch}
            setbranchNameDropDown={setbranchNameDropDown}
            branchManagerName={branchManagerName}
            handleSumbit={handleSumbit}
            editAudit={editAudit} seteditAudit={seteditAudit}
        />
        </>
    )
}

