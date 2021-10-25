import React, { useState } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import { styles } from "./styles";
import { STAR, UNSTAR, ARROW, INFO_ICON, CROSS, PRIMARY_BLUE_COLOR } from "../../../../utils/constant";
import DropDown from '../../../../component/DropDown'
import { useNavigation } from "@react-navigation/native";
const Question = (props) => {
    const data = [{ name: "demo1" }, { name: "demo2" }, { name: "demo3" },]
    const [onInfo, setonInfo] = useState(false)
    const handleInfo = () => {
        setonInfo(!onInfo)
    }
    const navigation=useNavigation()
    const { handleNext } = props
    return (
        <View style={styles.container}>
            <Header leftImg={ARROW} headerText={"Audit Question"} onPress={()=>navigation.goBack()}/>
            <ScrollView>
                <View style={styles.mainvwe}>
                    <TouchableOpacity style={{
                        position: "absolute", right: 1,
                        zIndex: 10, padding: 10
                    }}
                        onPress={() => handleInfo()}
                    ><Image source={INFO_ICON} style={{ width: 20, height: 20 }}/>
                    </TouchableOpacity>
                    {
                        onInfo && (
                            <View style={styles.info}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={styles.info_txt}>More information</Text>
                                    <TouchableOpacity onPress={()=>handleInfo()}>
                                        <Image source={CROSS} style={{tintColor:PRIMARY_BLUE_COLOR,width:25,height:25}}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.info_ptxt}>Photo requirment : Mondatory</Text>
                                <Text style={styles.info_ptxt}>Remark requirment : Optional</Text>
                                <Text style={styles.info_ptxt}>is RMM Actionable : Yes</Text>
                                <Text style={styles.info_ptxt}>is Admin Actionable : No</Text>
                                <Text style={styles.info_ptxt}>is Branch Manager Actionable : Yes</Text>
                            </View>
                        )
                    }
                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row' }}>
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
                            <View style={styles.brnachnme}>
                                <Text style={styles.txt}>Capture The image</Text>
                            </View>
                            <TouchableOpacity
                                
                                style={{
                                    backgroundColor: '#1b7dec',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '45%',
                                    height: 25,
                                    borderRadius: 20,
                                    marginTop: 10
                                }} >
                                <Text style={{
                                    fontSize: 14, fontWeight: '700', color: "#ffffff"
                                }}>Capture Screenshot</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.img_sec}>
                            <View style={styles.d_sec_img}>
                                <Image source={require('../../../../assets/images/MaskGroup6.png')} style={styles.sec_img} />
                                <TouchableOpacity style={{ position: "absolute", right: 1, backgroundColor: "#fff", borderRadius: 100 }}>
                                    <Image source={CROSS} style={styles.cross_icon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.branname}>Rating</Text>
                            <View style={styles.star}>
                                <Image source={STAR} style={styles.star_icon} />
                                <Image source={STAR} style={styles.star_icon} />
                                <Image source={STAR} style={styles.star_icon} />
                                <Image source={UNSTAR} style={styles.star_icon} />
                                <Image source={UNSTAR} style={styles.star_icon} />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.branname, { marginLeft: 10 }]}>
                                Actionable
                            </Text>
                            <DropDown title={"BM/RMM/AC"} data={data} />
                        </View>
                        <View>
                            <Text style={[styles.branname, { marginLeft: 10 }]}>
                                Remarks
                            </Text>
                            <TextInput placeholder="Remarks" style={styles.input} />
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <Button buttonText={"Next"} onPress={() => handleNext()} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default Question;
