import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import { styles } from "./styles";
import { STAR,UNSTAR,ARROW,INFO_ICON } from "../../../../utils/constant";
import DropDown from '../../../../component/DropDown'
import { TextInput } from "react-native-gesture-handler";
import ButtonStyle from "../../../../component/Button";
import { useNavigation } from "@react-navigation/native";
const Question = (props) => {
    const data=[{name:"demo1"},{name:"demo2"},{name:"demo3"},]
    const {handleNext}=props
    const navigation=useNavigation()
    return (
        <View style={styles.container}>
            <Header leftImg={ARROW} headerText={"Audit Question"} onPress={()=>navigation.goBack()}/>
            <ScrollView>
                <View style={styles.mainvwe}>
                <Image source={INFO_ICON} style={{width:20,height:20,position:"absolute",right:1,margin:10}}/>
                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row'}}>
                            <View style={{ flex: 5, }}>
                                <Text style={styles.branname}>
                                    Lorem ipsum Title
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.txt}>
                            Lorem ipsum Title Lorem ipsum Title Lorem ipsum Title
                            Lorem ipsum Title
                        </Text>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            paddingBottom: 5, paddingTop: 5,
                        }}>
                            <Image style={{
                                width: '90%', borderRadius: 10
                            }} source={require('../../../../assets/images/MaskGroup6.png')} />
                        </View>
                        <View style={styles.brnchmannme}>
                            <Button buttonText={"Yes"} style={{paddingVertical:5}}/>
                            <Button buttonText={"No"} style={{paddingVertical:5}}/>
                            <Button buttonText={"NA"} style={{paddingVertical:5}}/>
                            
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.branname}>Rating</Text>
                            <View style={styles.star}>
                                <Image source={STAR} style={styles.star_icon}/>
                                <Image source={STAR} style={styles.star_icon}/>
                                <Image source={STAR} style={styles.star_icon}/>
                                <Image source={UNSTAR} style={styles.star_icon}/>
                                <Image source={UNSTAR} style={styles.star_icon}/>
                            </View>
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={[styles.branname, { marginLeft: 10 }]}>
                                Actionable
                            </Text>
                            <DropDown title={"BM/RMM/AC"} data={data}/>
                        </View>
                        <View>
                            <Text style={[styles.branname, { marginLeft: 10 }]}>
                                Remarks
                            </Text>
                            <TextInput placeholder="Remarks" style={styles.input}/>
                        </View>
                        <View style={{marginVertical:20}}>
                        <Button buttonText={"Next"} onPress={()=>handleNext()}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default Question;
