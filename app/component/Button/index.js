import React from 'react'
import { TouchableOpacity, Text,StyleSheet } from 'react-native'
import {PRIMARY_BLUE_COLOR } from "../../utils/constant"
export default function index({title}) {
    return (
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btn_text}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    btn:{
        backgroundColor:PRIMARY_BLUE_COLOR,
        borderRadius:20,
        alignItems:"center",
        paddingVertical:12,
        marginTop:30
    },
    btn_text:{
        color:"#fff",
        fontWeight:"600",
        fontSize:17
    },
})

