import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/UserContext';
import Profile from './component/Profile'
import { apiCall } from '../../../utils/httpClient';
import apiEndPoints from '../../../utils/apiEndPoints';
import Loader from '../../../utils/Loader';
import AsyncStorage from '@react-native-community/async-storage';

export default function index() {
    const [userData, setUserData] = useContext(UserContext)
    console.log('userData: ', userData);
    const [isLoading, setIsLoading] = useState(false)
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        designation: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (userData) {
            setProfileData({
                ...profileData,
                firstName: userData.name,
                lastName: "",
                designation: "",
                email: userData.email,
                phone: userData.phone
            })
        }
    }, [])


    async function _handleSubmit(params) {
        try {
            setIsLoading(true)
            const params = {
                name: profileData.firstName,
                emp_code: userData.emp_code,
                branch_id: userData.branch_id,
                phone: profileData.phone,
            }
            console.log('params: ', params);
            const { data } = await apiCall('POST', apiEndPoints.PROFILE_UPDATE, params)
            console.log('data: ', data);
            if (data.status === 200) {
                setIsLoading(false)
                setUserData(data.data)
                AsyncStorage.setItem('userData', JSON.stringify(data.data))
                alert(data.message)
            }
            else {
                setIsLoading(false)
                alert(data.message)
            }
        } catch (error) {
            setIsLoading(false)
            alert(JSON.stringify(error))
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <Profile
                profileData={profileData}
                setProfileData={setProfileData}
                _handleSubmit={_handleSubmit}
            />
        </>
    )
}
