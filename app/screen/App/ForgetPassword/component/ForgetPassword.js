import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text } from 'react-native'
import Header from '../../../../component/Header'
import {ARROW} from '../../../../utils/constant'
import {styles} from './styles'
export default function ForgetPassword() {
    const navigation=useNavigation()
    return (
        <View>
            <Header leftImg={ARROW} headerText={"Forget Password"} onPress={()=>navigation.goBack()}/>

        </View>
    )
}
