import React from 'react'
import { View, Text } from 'react-native'
import AuditSuccess from './component/AuditSuccess'

export default function Index({navigation}) {
    const handleHome=()=>{
        navigation.navigate("DashboardScreen")
    }
    return (
        <AuditSuccess handleHome={handleHome}/>
    )
}
