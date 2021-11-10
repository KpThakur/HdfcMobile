import React from 'react'
import { View, Text } from 'react-native'
import Actionable from './component/Actionable'

export default function index({navigation,route}) {
    const data=route.params
    console.log("PARMA",data)
    return (
        <Actionable data={data}/>
    )
}
