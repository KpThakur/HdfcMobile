import moment from 'moment'
import React, { useState, useEffect,useContext } from 'react'
import { View, Text, Alert } from 'react-native'
import apiEndPoints from '../../../utils/apiEndPoints'
import { EditAuditContext } from '../../../utils/EditAuditContext'
import { apiCall } from '../../../utils/httpClient'
import RescheduleAudit from './component/RescheduleAudit'
import Loader from '../.../../../../utils/Loader'
import { LoadingContext } from '../../../utils/LoadingContext'

export default function Index({ navigation }) {
    const [cityBranch, setcityBranch] = useState([])
    const [cityName, setCityName] = useState()
    const [branchDetail, setbranchDetail] = useState([])
    const [isLaoding, setisLaoding] = useContext(LoadingContext)
    // const [isLaoding, setisLaoding] = useState(false)
    const [citydropDown, setcitydropDown] = useState(false)
    const [branchName, setbranchName] = useState()
    const [branchNameDropDown, setbranchNameDropDown] = useState(false)
    const [branchManagerName, setbranchManagerName] = useState()
    const [cityId, setcityId] = useState()
    const [branchNameId, setbranchNameId] = useState()
    const [branchManagerId, setbranchManagerId] = useState()
    const [editAudit,seteditAudit]=useContext(EditAuditContext)
    const [availability, setAvailability] = useState();
    const [employeName, setEmployeeName] = useState();
    const [employeEmail, setEmployeeEmail] = useState();
    const [employeeRole, setEmployeeRole] = useState(1);
    const [employeeDesignation, setEmployeeDesignation] = useState();
    const [employeeID, setEmployeeID] = useState();
    useEffect(() => {
        // getCityName()
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
    const handleSelectBranch = (branch_name, branch_id,city_id,city_name) => {
        seteditAudit({...editAudit,city_id,city_name,branch_name,branch_id,branch_manager_id:null,branch_manager:null})
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

        } catch (error) {
            console.log(error)
        }
    }
    const getBranchName = async (city_id) => {
        try {
            const params = { city_id }
            const response = await apiCall('POST', apiEndPoints.GET_BRANCH_NAME)
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
        if(editAudit.audit_type === 1 && !editAudit.bm_availability )
        {
            ShowAlert("Please select BM availability");
            return false
        }
        if(editAudit.bm_availability === 2){
            if(editAudit.audit_type === 1 && !editAudit.emp_name)
            {
                ShowAlert("Please enter employee name");
                return false
            }if(editAudit.audit_type === 1 && editAudit.emp_name.trim() === '')
            {
                ShowAlert("Please enter valid employee name");
                return false
            }
            if(editAudit.audit_type === 1 && !editAudit.emp_email)
            {
                ShowAlert("Please enter employee email");
                return false
            }if(editAudit.audit_type === 1 && (reg.test(editAudit.emp_email) === false || editAudit.emp_email.trim() === ''))
            {
                ShowAlert("Please enter valid email address");
                return false
            }
            // if(editAudit.audit_type === 1 && !editAudit.emp_role_type)
            // {
            //     ShowAlert("Please select employee role");
            //     return false
            // }
            if(editAudit.audit_type === 1  && !editAudit.emp_role)
            {
                ShowAlert("Please enter employee designation");
                return false
            }if(editAudit.audit_type === 1 && editAudit.emp_role.trim() === '')
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
            try {
                setisLaoding(true)
                const response = await apiCall('POST', apiEndPoints.EDIT_AUDIT, editAudit)
                setisLaoding(false)
                if(response.status===200)
                {
                   navigation.navigate('DashboardScreen')
                }  else{
                    Alert.alert(response.data.message)
                }

            } catch (error) {
                console.log(error, "ERROR")
            }

        }
    }
    
    return (
        <>
        {/* {isLaoding&& <Loader/>} */}
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
            employeeID={employeeID}
            setEmployeeID={setEmployeeID}
        />
        </>
    )
}

