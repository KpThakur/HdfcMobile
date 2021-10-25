import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import apiEndPoints from '../../../utils/apiEndPoints'
import { apiCall } from '../../../utils/httpClient'
import ScheduleNewAudit from './component/ScheduleNewAudit'

export default function index({ navigation }) {
    const [date, setdate] = useState()
    const [time, settime] = useState()
    const [cityBranch, setcityBranch] = useState([])
    const [cityName, setCityName] = useState()
    const [branchDetail, setbranchDetail] = useState([])
    const [isLaoding, setisLaoding] = useState(false)
    const [citydropDown, setcitydropDown] = useState(false)
    const [branchName, setbranchName] = useState()
    const [branchNameDropDown, setbranchNameDropDown] = useState(false)
    const [branchManagerName, setbranchManagerName] = useState()
    const [auditType, setauditType] = useState(1)
    const [cityId, setcityId] = useState()
    const [branchNameId, setbranchNameId] = useState()
    const [branchManagerId, setbranchManagerId] = useState()
    useEffect(() => {
        getCityName()
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
        setCityName(city_name)
        setcityId(city_id)
        setcitydropDown(!citydropDown)
        getBranchName(city_id)
    }
    const handleSelectBranch = (branch_name, branch_id) => {
        setbranchName(branch_name)
        setbranchNameId(branch_id)
        setbranchNameDropDown(!branchNameDropDown)
        getManagerName(branch_id)
    }
    const getManagerName = async (branch_id) => {
        try {
            setisLaoding(true)
            const params = { branch_id }
            const response = await apiCall('POST', apiEndPoints.GET_MANAGER_NAME, params)
            if (response.status === 200) {
                setbranchManagerName(response.data.data[0].branch_manager)
                setbranchManagerId(response.data.data[0].branch_manager_id)
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
            console.log("PARAMS", params)
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
        if (!cityId) {
            ShowAlert('Select City Name')
            return false
        }
        if (!branchNameId) {
            ShowAlert('Select Branch Name')
            return false
        }
        if (!time) {
            ShowAlert('Select Time')
            return false
        }
        if (!date) {
            ShowAlert('Select Date')
            return false
        }
        if(date<moment(moment()).format('DD-MM-YYYY'))
        {
            ShowAlert("You can't select previous date")
            return false
        }
        return true
    }
    const handleSumbit = async () => {
        const vaild = validation()
        if (vaild) {
            const params = {
                city_id: cityId,
                branch_id: branchNameId,
                branch_manager: branchManagerName,
                audit_date: date,
                audit_time: time, audit_type: auditType,
                branch_manager_id: branchManagerId
            }
            try {
                const response = await apiCall('POST', apiEndPoints.CREATE_AUDIT, params)
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
        <ScheduleNewAudit cityBranch={cityBranch}
            time={time}
            settime={settime}
            date={date}
            setdate={setdate}
            handleSchedule={handleSchedule}
            cityName={cityName}
            setCityName={setCityName}
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
            auditType={auditType}
            setauditType={setauditType}
            handleSumbit={handleSumbit}
        />
    )
}

