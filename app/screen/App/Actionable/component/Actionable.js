import React from 'react'
import { View, Text,Image, ScrollView,TouchableOpacity } from 'react-native'
import { styles } from './styles'
import Header from '../../../../component/Header'
import {CAMERA} from '../../../../utils/constant'
export default function Actionable() {
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
            <Header headerText={"Actionable 1"}/>
            <View style={styles.main}>
                <View style={styles.head}>
                    <Image source={require('../../../../assets/images/MaskGroup6.png')} style={styles.img}/>
                    <TouchableOpacity style={styles.camera_icon}>
                        <Image source={CAMERA} style={styles.icon_img}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <Text style={styles.txt}>Action By</Text>
                    <Text style={styles.b_txt}>Branch Manager</Text>
                    <Text style={styles.txt}>Remarks</Text>
                    <Text style={styles.b_txt}>Lorem ipsum Title Lorem ipsum Title Lorem ipsum Title Lorem ipsum Title</Text>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}
