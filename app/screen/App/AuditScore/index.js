import React from 'react'
import { View, Text } from 'react-native'
import AuditScore from './component/AuditScore'

export default function index({navigation}) {
    const handleViewActionable=()=>{
        navigation.navigate("ReviewAduit")
    }
    return (
        <AuditScore handleViewActionable={handleViewActionable}/>
    )
}
