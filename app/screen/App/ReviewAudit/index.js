import React from 'react'
import ReviewAuit from './component/ReviewAuit'

export default function index({navigation}) {
    const handleSubmitReport=()=>{
        navigation.navigate("AuditSuccess")
    }
    return (
        <ReviewAuit handleSubmitReport={handleSubmitReport}/>
    )
}
