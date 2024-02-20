import moment from 'moment'
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Alert } from 'react-native'
import apiEndPoints from '../../../utils/apiEndPoints'
import { apiCall } from '../../../utils/httpClient'
import ScheduleNewAudit from './component/ScheduleNewAudit'
import Loader from '../../../utils/Loader'
import { useFocusEffect } from '@react-navigation/native'
import { LoadingContext } from '../../../utils/LoadingContext'
export default function Index({ navigation }) {
    const [date, setdate] = useState()
    const [time, settime] = useState()
    const [cityBranch, setcityBranch] = useState([])
    const [cityName, setCityName] = useState()
    const [branchDetail, setbranchDetail] = useState([])
    const [isLaoding, setisLaoding] = useContext(LoadingContext)
    // const [isLaoding, setisLaoding] = useState(false)
    const [citydropDown, setcitydropDown] = useState(false)
    const [branchName, setbranchName] = useState()
    const [branchNameDropDown, setbranchNameDropDown] = useState(false)
    const [branchManagerName, setbranchManagerName] = useState()
    const [auditType, setauditType] = useState(2)
    const [cityId, setcityId] = useState(null)
    const [branchNameId, setbranchNameId] = useState()
    const [branchManagerId, setbranchManagerId] = useState()
    const [availability, setAvailability] = useState();
    const [employeName, setEmployeeName] = useState();
    const [employeEmail, setEmployeeEmail] = useState();
    const [employeeRole, setEmployeeRole] = useState(1);
    const [employeeDesignation, setEmployeeDesignation] = useState();
    useEffect(() => {
        // getCityName()
        resetState();
    }, [])
    const resetState = () => {
        setdate(null);
        settime(null);
        setCityName(null);
        setbranchName(null);
        setbranchManagerName(null);
        setauditType(2);
        setcityId(null);
        setbranchNameId(null);
        setbranchManagerId(null);
        setAvailability(null)
        setEmployeeName(null)
        setEmployeeEmail(null)
        setEmployeeRole(null)
        setEmployeeDesignation(null)
    }
    const getCityName = async (branch_id) => {
        try {
            setisLaoding(true)
            const params = { branch_id }
            const response = await apiCall('POST', apiEndPoints.GET_CITY_BRANCH, params)
            setisLaoding(false)
            if (response.status === 200) {
                setcityBranch(response.data.data)
                
            }

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
    const handleSelectBranch = (branch_name, branch_id, city_id,city_name) => {
        setbranchName(branch_name)
        setbranchNameId(branch_id)
        setbranchNameDropDown(!branchNameDropDown)
        getManagerName(branch_id)
        setCityName(city_name)
        setcityId(city_id)
    }
    
    const getManagerName = async (branch_id) => {
        try {
            setisLaoding(true)
            const params = { branch_id }
            const response = await apiCall('POST', apiEndPoints.GET_MANAGER_NAME, params)
            setisLaoding(false)
            if (response.status === 200) {
                setbranchManagerName(response.data.data[0].branch_manager)
                setbranchManagerId(response.data.data[0].branch_manager_id)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const getBranchName = async (city_id = '') => {
        try {
            setisLaoding(true)
            const params = { city_id }
            const response = await apiCall('POST', apiEndPoints.GET_BRANCH_NAME)
            setisLaoding(false)
            if (response.status === 200) {
                setbranchDetail(response.data.data)
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
        let reg = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
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
        if(auditType === 1 && !availability )
        {
            ShowAlert("Please select BM availability");
            return false
        }
        if(availability === 2 ){
            if(auditType === 1 && !employeName)
            {
                ShowAlert("Please enter employee name");
                return false
            }if(auditType === 1 && employeName.trim() === '')
            {
                ShowAlert("Please enter valid employee name");
                return false
            }
            if(auditType === 1 && !employeEmail)
            {
                ShowAlert("Please enter employee email");
                return false
            }if(auditType === 1 && (reg.test(employeEmail) === false || employeEmail.trim() === ''))
            {
                ShowAlert("Please enter valid email address");
                return false
            } if(auditType === 1 && !employeeRole)
            {
                ShowAlert("Please select employee role");
                return false
            }
            if(auditType === 1 && employeeRole === 2 && !employeeDesignation)
            {
                ShowAlert("Please enter employee designation");
                return false
            }if(auditType === 1 && employeeRole === 2 && employeeDesignation.trim() === '')
            {
                ShowAlert("Please enter valid employee designation");
                return false
            }
            
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
                audit_time: time, 
                audit_type: auditType,
                branch_manager_id: branchManagerId,
                bm_availability : auditType === 1 ? availability : null,
                emp_name : auditType === 1 ? employeName : null,
                emp_email : auditType === 1 ? employeEmail : null,
                emp_role_type : auditType === 1 && availability === 2 ? employeeRole : null,
                emp_role : auditType === 1 && employeeRole === 2 ? employeeDesignation : null
            }
            try {
                setisLaoding(true)
                const response = await apiCall('POST', apiEndPoints.CREATE_AUDIT, params)
                setisLaoding(false)
                if(response.status===200)
                {
                    Alert.alert("Review Scheduled Successfully !")
                    navigation.navigate('DashboardScreen')
                }
                else{
                    Alert.alert(response.data.message)
                }
            } catch (error) {
                console.log(error, "ERROR")
            }

        }
    }
    useFocusEffect(React.useCallback(()=>{
         resetState();
         //getCityName();
         getBranchName();
    },[]))

    return (
        <>
        {/* {isLaoding&&<Loader/>} */}
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
            cityId = {cityId}
            availability = {availability}
            setAvailability= {setAvailability}
            employeName = {employeName}
            setEmployeeName = {setEmployeeName}
            employeEmail = {employeEmail}
            setEmployeeEmail = {setEmployeeEmail}
            employeeRole = {employeeRole}
            setEmployeeRole = {setEmployeeRole}
            employeeDesignation = {employeeDesignation}
            setEmployeeDesignation = {setEmployeeDesignation}
        />
        </>
    )
}

