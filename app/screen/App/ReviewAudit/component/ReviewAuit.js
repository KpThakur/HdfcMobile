import React from 'react'
import { View, Text } from 'react-native'
import Header from '../../../../component/Header'
import {styles} from './styles'
import DropDown from '../../../../component/DropDown'
import Button from '../../../../component/Button'
import { useNavigation } from '@react-navigation/native'
export default function ReviewAuit(props) {
    const {handleSubmitReport,setcitydropDown}=props
    const navigation = useNavigation();
    const OnpressDrawer = () => {
        navigation.openDrawer()
    }
    const data=[{name:"Actionable 1"},{name:"Actionable 2"},{name:"Actionable 3"}]
    return (
        <View style={styles.container}>
            <Header headerText={"Audit Actionable Review"} onPress={OnpressDrawer}/>
            <View style={styles.main}>
                <Text style={styles.h_txt}>Audits Actions By :</Text>
                <DropDown setdropDown={setcitydropDown} title={"Branch Manager"} data={data}/>
                <DropDown setdropDown={setcitydropDown} title={"Regional Marketing Manager"} data={data}/>
                <DropDown setdropDown={setcitydropDown} title={"Admin"} data={data}/>
            </View>
            <View style={{flex:4,justifyContent:"flex-end",marginBottom:10}}>
                <Button buttonText={"Submit Report"} onPress={()=>handleSubmitReport()}/>
            </View>
        </View>
    )
}
