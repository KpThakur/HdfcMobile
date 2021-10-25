import React from 'react'
import { View, Text } from 'react-native'
import ReviewAuit from './component/ReviewAuit'

export default function index({navigation}) {
    const handleSubmitReport=()=>{
        navigation.navigate("AuditSuccess")
    }
    return (
        <ReviewAuit handleSubmitReport={handleSubmitReport}/>
    )
}
