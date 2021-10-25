import React from 'react'
import { View,Modal,TouchableOpacity,Image,TextInput, Text, Dimensions } from 'react-native'
import { PRIMARY_BLUE_COLOR ,CANCEL_ICON} from '../../utils/constant'
import Button from '../Button'
export default function index(props) {
    const {popup,togglePopUp}=props
    return (
        <Modal animationType="slide"
            transparent={true}
            visible={popup} >
                <View style={{flex:1,position:"absolute",backgroundColor: 'rgba(100,100,100, 0.8)',height:"100%"}}>
            <View style={{ justifyContent: "space-between",marginTop:"60%",backgroundColor:"#fff"
            , marginHorizontal: 10, padding: 20, height: 300, borderRadius: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: PRIMARY_BLUE_COLOR, fontSize: 26 }}>Cancel Audit</Text>
                    <TouchableOpacity onPress={() => togglePopUp()} style={{ position: "absolute", right: 1 }}>
                        <Image source={CANCEL_ICON} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#000", fontSize: 18 }}>Let us know why you want to cancel the audit.</Text>
                <TextInput placeholder="Reasone for canceling the audit."
                    style={{ backgroundColor: "#eee", width: "100%", paddingHorizontal: 10, paddingBottom: 40 }} />
                <View style={{ paddingHorizontal: 70 }}>
                    <Button buttonText={"Cancel"} />
                </View>
            </View>
            </View>
        </Modal>
    )
}
