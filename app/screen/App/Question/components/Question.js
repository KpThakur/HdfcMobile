import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, BackHandler } from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import { styles } from "./styles";
import ImagePicker from 'react-native-image-crop-picker'
import {
    STAR, UNSTAR, ARROW, INFO_ICON, CROSS, PRIMARY_BLUE_COLOR, GREY_TEXT_COLOR,
    CHECKED_FILLED, FONT_FAMILY_REGULAR, DOWNARROW, CAMERA, UNCHECKED_ICON, DARK_BLUE_COLOR, GALLERY, MEDIUM_FONT_SIZE, SMALL_FONT_SIZE
} from "../../../../utils/constant";
import DropDown from '../../../../component/DropDown'
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../../../component/scaleFontSize";
const Question = (props) => {

    const [onInfo, setonInfo] = useState(false)
    const [defaultRating, setdefaultRating] = useState(0)
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])
    const [dropDown, setdropDown] = useState(false)
    const [showIndex, setshowIndex] = useState()
    const [ssDropDown, setssDropDown] = useState(false)
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            setssDropDown(!ssDropDown)
        })
        return BackHandler.removeEventListener("hardwareBackPress", () => {
            setssDropDown(!ssDropDown)
        })
    }, [ssDropDown])
    const handleInfo = () => {
        setonInfo(!onInfo)
    }
    const navigation = useNavigation()
    const { handleNext, question, setquestion, remark, setremark, rating, setrating, rmmactionable, setrmmactionable,
        bmActionable, setbmActionable, questionList, setyesNo, quality, setquality, checkedAns, setcheckedAns, yesNo } = props
    const handleRating = async (item) => {
        await setdefaultRating(item)
        await setrating(item)
    }
    const CustomRatingBar = () => {
        return (
            <View style={{ marginLeft: 15 }}>
                <Text style={styles.branname}>Rating</Text>
                <View style={{ flexDirection: "row" }}>
                    {
                        maxRating.map((item, key) => (
                            <TouchableOpacity style={styles.star} key={item} onPress={() => handleRating(item)}>
                                <Image source={item <= defaultRating ? STAR : UNSTAR} style={styles.star_icon} />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
    const handleDropDown = () => {
        setdropDown(!dropDown)
    }
    const HandleActionable = async (type) => {
        if (type === 1) {
            await setbmActionable(1)
            await setrmmactionable(0)
            await setdropDown(!dropDown)
        } else {
            await setrmmactionable(1)
            await setbmActionable(0)
            await setdropDown(!dropDown)
        }
    }
    const HandleAns = (index, question) => {
        setshowIndex(index)
        setcheckedAns(question)
    }
    const OpenGallery = () => {
        ImagePicker.openPicker({ multiple: true })
            .then(images => {
                console.log(images)
            })
    }
    const OpenCamera = () => {
        ImagePicker.openCamera({ width: 300, height: 400 })
            .then(images => {
                console.log(images)
            })
    }
    return (
        <View style={styles.container}>
            <Header leftImg={ARROW} headerText={"Audit Question"} onPress={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.mainvwe}>
                    <TouchableOpacity style={{
                        position: "absolute", right: 1,
                        zIndex: 10, padding: 10
                    }}
                        onPress={() => handleInfo()}
                    ><Image source={INFO_ICON} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    {
                        onInfo && (
                            <View style={styles.info}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={styles.info_txt}>More information</Text>
                                    <TouchableOpacity onPress={() => handleInfo()}>
                                        <Image source={CROSS} style={{ tintColor: PRIMARY_BLUE_COLOR, width: 25, height: 25 }} />
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
                                    {question.data.question_title}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.txt}>
                            {question.data.audit_question}
                        </Text>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            paddingBottom: 5, paddingTop: 5,
                        }}>
                            <Image style={{
                                width: '90%', borderRadius: 10
                            }} source={require('../../../../assets/images/MaskGroup6.png')} />
                        </View>
                        {
                            question.data.question_type === '1' &&
                            (
                                <>
                                    <View style={styles.brnchmannme}>
                                        <View style={styles.brnachnme}>
                                            <Text style={styles.txt}>Capture The image</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => setssDropDown(!ssDropDown)}
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
                                        {
                                            ssDropDown &&
                                            <Modal transparent={true}>
                                                <View style={{ backgroundColor: "#fff", width: "100%", position: "absolute", bottom: 0, paddingVertical: 40 }}>
                                                    <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:10}}>
                                                        <Text style={{ color: "#000", color: "#000", fontFamily: FONT_FAMILY_REGULAR, fontSize: normalize(SMALL_FONT_SIZE) }}>
                                                            Choose from
                                                        </Text>
                                                        <TouchableOpacity onPress={()=>setssDropDown(!ssDropDown)}>
                                                            <Image source={CROSS}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => OpenCamera()}>
                                                            <Image source={CAMERA} style={{ width: 30, height: 30, resizeMode: "contain", tintColor: PRIMARY_BLUE_COLOR }} />
                                                            <Text style={{ color: "#000", fontFamily: FONT_FAMILY_REGULAR }}>Camera</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => OpenGallery()}>
                                                            <Image source={GALLERY} style={{ width: 30, height: 30, resizeMode: "contain", tintColor: PRIMARY_BLUE_COLOR }} />
                                                            <Text style={{ color: "#000", fontFamily: FONT_FAMILY_REGULAR }}>Gallery</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal>}
                                    </View>
                                    <View style={styles.img_sec}>
                                        <View style={styles.d_sec_img}>
                                            <Image source={require('../../../../assets/images/MaskGroup6.png')} style={styles.sec_img} />
                                            <TouchableOpacity style={{ position: "absolute", right: 1, backgroundColor: "#fff", borderRadius: 100 }}>
                                                <Image source={CROSS} style={styles.cross_icon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            )
                        }
                        {question.data.question_type === '2' && (
                            <View style={styles.brnchmannme}>
                                <Button buttonText={"Yes"} style={{ paddingVertical: 5, backgroundColor: yesNo === "YES" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR }} onPress={() => setyesNo('YES')} />
                                <Button buttonText={"No"} style={{ paddingVertical: 5, backgroundColor: yesNo === "NO" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR }} onPress={() => setyesNo('NO')} />
                                <Button buttonText={"NA"} style={{ paddingVertical: 5, backgroundColor: yesNo === "NA" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR }} onPress={() => setyesNo('NA')} />
                            </View>
                        )}
                        {question.data.question_type === '3' && (
                            <View style={styles.brnchmannme}>
                                <TextInput placeholder="Enter the quantity"
                                    value={quality} onChangeText={text => setquality(text)}
                                    style={{ padding: 10, backgroundColor: "#ecececec", width: "100%" }} />
                            </View>
                        )}
                        {question.data.question_type === '4' && (

                            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={styles.txt}>Answer the following question</Text>
                                {
                                    questionList && questionList.map((question, index) => {
                                        return (
                                            <TouchableOpacity style={{ flexDirection: "row", marginBottom: 5 }} onPress={() => HandleAns(index, question)} key={index}>
                                                <Image source={showIndex === index ? CHECKED_FILLED : UNCHECKED_ICON} style={{ width: 20, height: 20, marginRight: 5 }} />
                                                <Text style={{
                                                    fontSize: normalize(12),
                                                    fontFamily: FONT_FAMILY_REGULAR,
                                                    color: showIndex === index ? PRIMARY_BLUE_COLOR : "#000"
                                                }}>{question}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    )}
                            </View>
                        )
                        }
                        <CustomRatingBar />
                        {
                            question.data.rmm_actionable_assignee === "1" ?
                                <View style={{ marginTop: 20 }}>
                                    <Text style={[styles.branname, { marginLeft: 10 }]}>
                                        Actionable
                                    </Text>
                                    <TouchableOpacity onPress={() => handleDropDown()} style={{
                                        backgroundColor: GREY_TEXT_COLOR, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                                        justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10
                                    }} >
                                        <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>BM/RMM/AC</Text>
                                        {
                                            dropDown ? <Image source={DOWNARROW} style={{ transform: [{ rotateZ: "180deg" }] }} /> :
                                                <Image source={DOWNARROW} />
                                        }
                                    </TouchableOpacity>
                                    {
                                        dropDown &&
                                        <View>
                                            {
                                                question.data.bm_actionable_assignee == "1" &&
                                                <TouchableOpacity style={styles.drop_down_item} onPress={() => HandleActionable()}>
                                                    <Text style={styles.drop_down_txt}>Branch Manager</Text>
                                                </TouchableOpacity>
                                            }
                                            {
                                                question.data.rmm_actionable_assignee == "1" &&
                                                <TouchableOpacity style={styles.drop_down_item} onPress={() => HandleActionable()}>
                                                    <Text style={styles.drop_down_txt}>RMM</Text>
                                                </TouchableOpacity>}
                                        </View>
                                    }
                                </View> : null
                        }
                        {
                            question.data.remark === '1' &&
                            <View style={{ marginTop: 10 }}>
                                <Text style={[styles.branname, { marginLeft: 10 }]}>
                                    Remarks
                                </Text>
                                <TextInput placeholder="Remarks" style={styles.input} value={remark} onChangeText={text => setremark(text)} />
                            </View>
                        }

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
