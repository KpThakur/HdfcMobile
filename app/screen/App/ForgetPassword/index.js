import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import apiEndPoints from '../../../utils/apiEndPoints'
import { apiCall, setDefaultHeader } from '../../../utils/httpClient'
import ForgetPassword from './component/ForgetPassword'

export default function index() {
    const [email, setemail] = useState()
    const [otp, setotp] = useState()
    const [password, setpassword] = useState()
    const [verfyOTP, setverfyOTP] = useState(false)
    const [changePassowrd, setchangePassowrd] = useState(false)
    const [token, settoken] = useState()
    const navigation=useNavigation()
    const handleForgetPassword=async()=>{
        try {
            const params={
                email:email,
                otp:otp,
                password,
            }
            if(!verfyOTP){
            const response=await apiCall("POST",apiEndPoints.FORGET_PASSWORD,params)
            if(response.data.status===200)
            {
                alert("OTP send to your email")
                setverfyOTP(true)
            }
        }
        if(verfyOTP){
            const response=await apiCall("POST",apiEndPoints.VERIFY_OTP,params)
            settoken(response.data.token)
            if(response.data.status===200)
            {
                setchangePassowrd(true)
                setverfyOTP(false)
            }
            if(response.data.status===201)
            {
                alert(response.data.message)
            }
        }
        if(changePassowrd)
        {
            setDefaultHeader('token',token)
            const response=await apiCall("POST",apiEndPoints.RESET_PASSWORD,params)
            if(response.data.status===200)
            {
                alert(response.data.message)
                navigation.navigate('Login')
            }
        }
        } catch (error) {
            console.log(error)
        }
    }
    return (
       <ForgetPassword 
        email={email} setemail={setemail}
        otp={otp} setotp={setotp}
        handleForgetPassword={handleForgetPassword}
        verfyOTP={verfyOTP}
        password={password} setpassword={setpassword}
        changePassowrd={changePassowrd}
       />
    )
}
