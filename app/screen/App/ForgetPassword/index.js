import React, { useState } from 'react'
import { View, Text } from 'react-native'
import ForgetPassword from './component/ForgetPassword'

export default function index() {
    const [email, setemail] = useState()
    const [otp, setotp] = useState()
    const handleForgetPassword=async()=>{

    }
    return (
       <ForgetPassword 
        email={email} setemail={setemail}
        otp={otp} setotp={setotp}
        handleForgetPassword={handleForgetPassword}
       />
    )
}
