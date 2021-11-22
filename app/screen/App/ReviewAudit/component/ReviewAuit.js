import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Header from '../../../../component/Header';
import { styles } from './styles';
import DropDown from '../../../../component/DropDown';
import Button from '../../../../component/Button';
import { useNavigation } from '@react-navigation/native';
import { FONT_FAMILY_REGULAR, GREY_TEXT_COLOR, DOWNARROW } from '../../../../utils/constant';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../../../../utils/UserContext';
export default function ReviewAuit(props) {
    const { handleSubmitReport, BM, RM, bmDropDown, setbmDropDown,
        rmDropDown, setrmDropDown, baseURL,params
    } = props;
    const [userData, setUserData] = useContext(UserContext)
    const navigation = useNavigation();
    const OnpressDrawer = () => {
        navigation.openDrawer()
    }
    const handleBMDropDown = () => {
        setbmDropDown(!bmDropDown)
    }
    const handleRMDropDown = () => {
        setrmDropDown(!rmDropDown)
    }
    const HandleBM = (actionable) => {
        if(actionable.length>0)
            navigation.navigate("Actionable", { actionable: actionable, baseURL: baseURL })
        else
            alert("Branch Manager have not taken action!")
    }
    const HandleRMM = (actionable) => {
        navigation.navigate("Actionable", { actionable: actionable, baseURL: baseURL })
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ flexGrow: 1 }}>
                <Header headerText={"Audit Actionable Review"} onPress={OnpressDrawer} />
                <View style={styles.main}>
                    <Text style={styles.h_txt}>Audits Actions By :</Text>
                    {BM ?
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity onPress={() => handleBMDropDown()} style={{
                                backgroundColor: GREY_TEXT_COLOR, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                                justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10
                            }} >
                                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>{params.branch_manager}</Text>
                                {
                                    bmDropDown ? <Image source={DOWNARROW} style={{ transform: [{ rotateZ: "180deg" }] }} /> :
                                        <Image source={DOWNARROW} />
                                }
                            </TouchableOpacity>
                            {
                                bmDropDown &&
                                <View>
                                    {
                                        BM.map((bm, index) => (
                                            <TouchableOpacity style={styles.drop_down_item} key={index} onPress={() => HandleBM(bm.actionable)}>
                                                <Text style={styles.drop_down_txt}>{bm.audit_question.substring(0, 200)}</Text>
                                                {bm.actionable.actionable_remark ?
                                                    <Text>Remark: {bm.actionable.actionable_remark.substring(0, 100)}</Text>:null}
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            }
                        </View> : null
                    }
                    {RM ?
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity onPress={() => handleRMDropDown()} style={{
                                backgroundColor: GREY_TEXT_COLOR, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                                justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10
                            }} >
                                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>{userData.name}</Text>
                                {
                                    rmDropDown ? <Image source={DOWNARROW} style={{ transform: [{ rotateZ: "180deg" }] }} /> :
                                        <Image source={DOWNARROW} />
                                }
                            </TouchableOpacity>
                            {
                                rmDropDown &&
                                <View>
                                    {
                                        RM.map((rm, index) => (
                                            <TouchableOpacity style={styles.drop_down_item} key={index} onPress={() => HandleRMM(rm)}>
                                                <Text style={styles.drop_down_txt}>{rm.audit_question.substring(0, 200)}</Text>
                                                <Text>Remark: {rm.remark}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            }
                        </View> : null
                    }
                </View>
            </ScrollView>
            <View style={{  marginBottom: 10,position:"absolute",bottom:0 ,alignSelf:"center",width:"100%"}}>
                <Button buttonText={"Submit Report"} onPress={() => handleSubmitReport()} />
            </View>
        </View>
    )
}