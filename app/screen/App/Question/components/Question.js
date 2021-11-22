import React, { useContext, useEffect, useState } from "react";
import {
    Text, View, ScrollView, Image, TouchableOpacity, TextInput, Modal, BackHandler, Dimensions, FlatList,
} from 'react-native';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import { styles } from "./styles";
import ImagePicker from 'react-native-image-crop-picker'
import {
    STAR, UNSTAR, ARROW, INFO_ICON, CROSS, PRIMARY_BLUE_COLOR, GREY_TEXT_COLOR,
    CHECKED_FILLED, FONT_FAMILY_REGULAR, DOWNARROW, CAMERA, UNCHECKED_ICON, DARK_BLUE_COLOR, GALLERY, MEDIUM_FONT_SIZE, SMALL_FONT_SIZE, FONT_FAMILY_BOLD, FONT_FAMILY_SEMI_BOLD
} from "../../../../utils/constant";
import DropDown from '../../../../component/DropDown'
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../../../component/scaleFontSize";
import Slider from '@react-native-community/slider';
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../../../../utils/UserContext";
import JoinChannelVideo from "../../../../component/Streaming/App_agora";
import Notify from "../../Notify";
import apiEndPoints from "../../../../utils/apiEndPoints";
import { apiCall } from "../../../../utils/httpClient";
const Question = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [onInfo, setonInfo] = useState(false)
    const [defaultRating, setdefaultRating] = useState(0)
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])
    const [dropDown, setdropDown] = useState(false)
    const [showIndex, setshowIndex] = useState()
    const [ssDropDown, setssDropDown] = useState(false);
    const [userData, setUserData] = useContext(UserContext)
    const [maxIMG, setmaxIMG] = useState(false)
    const [showModalIMG, setshowModalIMG] = useState()
    useEffect(() => {
        console.log("LASTEST: ", props.camImg)

    }, [props.camImg])
    // console.log("marger", props.managerJoin)
    const handleInfo = () => {
        setonInfo(!onInfo)
    }
    const navigation = useNavigation()
    const { handleSubmit, question, managerJoin, joined, setquestion, remark, setremark, rating, setrating, rmmactionable, setrmmactionable,
        bmActionable, setbmActionable, questionList, setyesNo, quality, setquality, checkedAns, setcheckedAns, yesNo, startAudit, setstartAudit,
        getIMG, onCapture
    } = props
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
    function _handleReivew(val) {
        props.setReviewValue(val)
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
        ImagePicker.openPicker({
            width: windowWidth,
            height: windowHeight / 2,
            multiple: true,
            cropping: true
        }).then(image => {
            let combineImg = props.camImg == null ? [] : [...props.camImg];
            image.map((val) => {
                console.log('val: ', val);
                combineImg.push({
                    path: val.path,
                    type: 'gallery'
                })
            })
            props.setCamImg(combineImg)
            setssDropDown(false)
        });
    }
    const OpenCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            let combineImg = props.camImg == null ? [] : [...props.camImg];
            combineImg.push({
                path: image.path,
                type: 'camera'
            })
            props.setCamImg(combineImg)
            setssDropDown(false)
        });
    }
    function deleteImage(index) {
        var imageArray = [...props.camImg]
        imageArray.splice(index, 1);
        props.setCamImg(imageArray)
    }
// console.log("question update:  ",question)
    const renderImage = (item, index) => {
        // console.log('item: ', item.path);
        return (
            <TouchableOpacity style={{ width: 60, height: 65, marginHorizontal: 5 }} onPress={() => showMaxIMG(index)}>
                <TouchableOpacity
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        position: "absolute",
                        zIndex: 9,
                        backgroundColor: "#fff",
                        right: 0,
                        top: 0
                    }}
                    onPress={() => deleteImage(index)}>
                    <Image
                        source={require('../../../../assets/images/add-alt.png')}
                        style={{
                            width: 20, height: 20, tintColor: PRIMARY_BLUE_COLOR
                        }}
                    />
                </TouchableOpacity>
                <View>
                    <Image
                        source={{ uri: item.path }}
                        style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    const showMaxIMG = (index) => {
        console.log("IMGSHOW:", props.camImg[index])
        setshowModalIMG(props.camImg[index])
        setmaxIMG(!maxIMG)
    }

    return (
        <View style={styles.container}>
            {/* <Header leftImg={ARROW} headerText={`Question - ${question?.data?.item_number}`} onPress={() => navigation.goBack()} /> */}
            {/* <ScrollView keyboardShouldPersistTaps={"always"} contentContainerStyle={{ flexGrow: 1, }}> */}
            {!startAudit ? <Header leftImg={''} headerText={"Start Audit"} /> : null}
            <View style={styles.mainvwe}>
                {
                    startAudit ?
                        <>
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
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 5, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={[styles.branname], { fontFamily: FONT_FAMILY_BOLD, color: "#000" }}>
                                        {question?.data?.question_title}
                                    </Text>
                                </View>
                            </View>
                            <Text style={[styles.txt, { marginTop: 10, fontWeight: "600", fontSize: normalize(SMALL_FONT_SIZE) }]}>
                                {question?.data?.audit_question}
                            </Text>
                        </>
                        : null
                }

                {
                    managerJoin && maxIMG ?
                        <Modal>
                            <View style={{ flex: 1, backgroundColor: "#171717" }}>
                                <TouchableOpacity
                                    style={{
                                        padding: 20,
                                        borderRadius: 100,
                                        position: "absolute",
                                        zIndex: 9,
                                        backgroundColor: "#fff",
                                        right: 0,
                                        top: 0
                                    }}
                                    onPress={() => showMaxIMG()}>
                                    <Image
                                        source={require('../../../../assets/images/add-alt.png')}
                                        style={{
                                            width: 20, height: 20, tintColor: PRIMARY_BLUE_COLOR
                                        }}
                                    /></TouchableOpacity>
                                <View style={{ alignItems: "center", marginTop: 150, padding: 10 }}>
                                    <Image source={{ uri: showModalIMG.path }} style={{ width: "100%", height: 300, resizeMode: "contain" }} />
                                </View>
                            </View>
                        </Modal>
                        : null
                }

                {
                    question.audit_type == 0 ? null :
                            <View style={{ height: 250 }}>
                                {
                                    props.managerJoin ?
                                        <>
                                            <JoinChannelVideo handleManagerJoin={(data) => props.handleManagerJoin(data)}
                                                token={props.token}
                                                channelId={props.channelId}
                                                handleJoin={(data) => props.handleJoin(data)}
                                            />
                                        </>
                                        :
                                        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                            <TouchableOpacity style={styles.bluestreaming}>
                                                <Text style={styles.textstraming}>No Live Streaming</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                        }
                {
                    startAudit ?
                        <ScrollView keyboardShouldPersistTaps={"always"} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, }}>
                            <View style={styles.body}>
                                {
                                    question?.data?.image_capture === "1" &&
                                    (
                                        <>
                                            {props?.camImg && !props.managerJoin ?
                                                <View style={{ alignItems: "center", marginTop: 10 }}>
                                                    {
                                                        props?.camImg && props.camImg.length > 0 ? <Image source={{ uri: props.camImg[props.camImg.length - 1].path }} style={{ width: "100%", height: 300, borderRadius: 10, resizeMode: "contain" }} /> : null
                                                    }
                                                </View> : null
                                            }

                                            <View style={styles.brnchmannme}>
                                                {/* <View style={styles.brnachnme}>
                                            <Text style={styles.txt}>Capture The image</Text>
                                        </View> */}
                                                <TouchableOpacity
                                                    onPress={() => { question.audit_type == 0 ? OpenCamera() : onCapture() }}
                                                    style={{
                                                        backgroundColor: '#1b7dec',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: 20,
                                                        paddingVertical: 10,
                                                        paddingHorizontal: 15
                                                    }} >
                                                    <Text style={{
                                                        fontSize: 14, fontWeight: '700', color: "#ffffff"
                                                    }}>Capture The image</Text>
                                                </TouchableOpacity>
                                                {/* {
                                                    ssDropDown &&
                                                    <Modal transparent={true}>
                                                        <View style={{ backgroundColor: "#fff", width: "100%", position: "absolute", bottom: 0, paddingVertical: 40 }}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
                                                                <Text style={{ color: "#000", color: "#000", fontFamily: FONT_FAMILY_REGULAR, fontSize: normalize(SMALL_FONT_SIZE) }}>
                                                                    Choose from
                                                                </Text>
                                                                <TouchableOpacity onPress={() => setssDropDown(!ssDropDown)}>
                                                                    <Image source={CROSS} />
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
                                                    </Modal>} */}
                                            </View>
                                            <View style={styles.img_sec}>
                                                <View style={styles.d_sec_img}>
                                                    <View style={{}}>
                                                        <FlatList
                                                            keyExtractor={(item, index) => index.toString()}
                                                            data={props.camImg}
                                                            horizontal={true}
                                                            pagingEnabled={true}
                                                            renderItem={({ item, index }) => { return renderImage(item, index) }
                                                            }
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                    )
                                }
                                {question?.data?.question_type === '1' && (
                                    <View style={styles.brnchmannme}>
                                        <Button buttonText={"Yes"} style={{ paddingVertical: 5, backgroundColor: yesNo === "YES" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR }} onPress={() => props.setyesNo('YES')} />
                                        <Button buttonText={"No"} style={{ paddingVertical: 5, backgroundColor: yesNo === "NO" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR }} onPress={() => props.setyesNo('NO')} />
                                        <Button buttonText={"NA"} style={{ paddingVertical: 5, backgroundColor: yesNo === "NA" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR }} onPress={() => props.setyesNo('NA')} />
                                    </View>
                                )}
                                {question?.data?.question_type === '2' && (
                                    <View style={styles.brnchmannme}>
                                        <TextInput placeholder="Enter the quantity"
                                            value={quality} onChangeText={text => setquality(text)}
                                            keyboardType={"numeric"}
                                            style={{ padding: 10, backgroundColor: "#ecececec", width: "100%" }} />
                                    </View>
                                )}
                                {question?.data?.question_type === '4' && (

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
                                {
                                    question.data.score_range_to > 1 ?
                                        <View style={{}}>
                                            <Text style={styles.branname}>Rating</Text>
                                            <View style={{ alignItems: "center" }}>
                                                <Text>Rating: <Text style={{ color: PRIMARY_BLUE_COLOR, fontFamily: FONT_FAMILY_SEMI_BOLD }}>{props.reviewValue}</Text></Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ flex: 0.5, justifyContent: "center", alignItems: "flex-end" }}>
                                                    <Text style={{ color: PRIMARY_BLUE_COLOR, fontFamily: FONT_FAMILY_SEMI_BOLD }}> {question.data.score_range_from}</Text>
                                                </View>
                                                <Slider
                                                    style={{ height: 40, flex: 5 }}
                                                    minimumValue={question.data.score_range_from}
                                                    maximumValue={question.data.score_range_to}
                                                    minimumTrackTintColor={PRIMARY_BLUE_COLOR}
                                                    maximumTrackTintColor="#000000"
                                                    value={props.reviewValue}
                                                    thumbTintColor={PRIMARY_BLUE_COLOR}
                                                    step={1}
                                                    onValueChange={(val) => _handleReivew(val)}
                                                />
                                                <View style={{ flex: 0.5 }}>
                                                    <Text style={{ color: PRIMARY_BLUE_COLOR, fontFamily: FONT_FAMILY_SEMI_BOLD }}>{question.data.score_range_to}</Text>
                                                </View>
                                            </View>
                                        </View> : null
                                }
                                {
                                    question?.data?.rmm_actionable_assignee === "1" || question?.data?.bm_actionable_assignee === "1" ?
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={styles.branname}>
                                                Actionable
                                            </Text>
                                            <TouchableOpacity onPress={() => handleDropDown()} style={{
                                                backgroundColor: GREY_TEXT_COLOR, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                                                justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10
                                            }} >
                                                <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>{bmActionable ? question.branch_manager : rmmactionable ? userData.name : "Select Actionable"}</Text>
                                                {
                                                    dropDown ? <Image source={DOWNARROW} style={{ transform: [{ rotateZ: "180deg" }] }} /> :
                                                        <Image source={DOWNARROW} />
                                                }
                                            </TouchableOpacity>
                                            {
                                                dropDown &&
                                                <View style={{ backgroundColor: GREY_TEXT_COLOR }}>
                                                    {
                                                        question.data.bm_actionable_assignee == "1" ?
                                                            <TouchableOpacity style={styles.drop_down_item} onPress={() => HandleActionable(1)}>
                                                                <Text style={styles.drop_down_txt}>{question.branch_manager}</Text>
                                                            </TouchableOpacity> : null
                                                    }
                                                    {
                                                        question.data.rmm_actionable_assignee == "1" ?
                                                            <TouchableOpacity style={styles.drop_down_item} onPress={() => HandleActionable(2)}>
                                                                <Text style={styles.drop_down_txt}>{userData.name}</Text>
                                                            </TouchableOpacity> : null
                                                    }
                                                </View>
                                            }
                                        </View> : null
                                }
                                {
                                    question?.data?.remark === '1' &&
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={styles.branname}>
                                            Remarks
                                        </Text>
                                        <TextInput placeholder="Remarks" style={styles.input} value={remark} onChangeText={text => setremark(text)} />
                                    </View>
                                }

                                <View style={{ marginVertical: 20, flex: 1, justifyContent: "flex-end" }}>
                                    <Button buttonText={"Next"} onPress={() => handleSubmit()} />
                                </View>
                            </View>
                        </ScrollView> :
                        <Notify managerJoin={managerJoin} joined={joined} setstartAudit={setstartAudit} />
                }
            </View>
            {/* </ScrollView> */}
        </View>
    )
}
export default Question;
