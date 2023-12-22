import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  BackHandler,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../../../../component/Header";
import Button from "../../../../component/Button";
import { styles } from "./styles";
import AuditScoreScreen from "../../AuditScore";
import ReviewAuditScreen from "../../ReviewAudit";
import ActionableScreen from "../../Actionable";
import ImagePicker from "react-native-image-crop-picker";
import ImageMarker, { Position, TextBackgroundType  } from 'react-native-image-marker';
import RNFS from 'react-native-fs';

import {
  STAR,
  UNSTAR,
  LEFT_ARROW,
  INFO_ICON,
  CROSS,
  PRIMARY_BLUE_COLOR,
  GREY_TEXT_COLOR,
  CHECKED_FILLED,
  FONT_FAMILY_REGULAR,
  DOWNARROW,
  CAMERA,
  CHECKED,
  UNCHECKED,
  UNCHECKED_ICON,
  DARK_BLUE_COLOR,
  GALLERY,
  MEDIUM_FONT_SIZE,
  SMALL_FONT_SIZE,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_SEMI_BOLD,
  HOME_ICON,
  BLACK_COLOR,
  MAP_KEY,
  FONT_FAMILY_THIN,
} from "../../../../utils/constant";
import DropDown from "../../../../component/DropDown";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../../../component/scaleFontSize";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../../../../utils/UserContext";
import JoinChannelVideo from "../../../../component/Streaming/App_agora";
import Notify from "../../Notify";
import apiEndPoints from "../../../../utils/apiEndPoints";
import { apiCall, getLocation } from "../../../../utils/httpClient";
import Geolocation from 'react-native-geolocation-service';
import axios from "axios";

const Question = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [onInfo, setonInfo] = useState(false);
  const [defaultRating, setdefaultRating] = useState(0);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [showIndex, setshowIndex] = useState();
  const [ssDropDown, setssDropDown] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const [maxIMG, setmaxIMG] = useState(false);
  const [showModalIMG, setshowModalIMG] = useState();
  const [data, setData] = useState();
  useEffect(() => {}, [props.camImg]);
  const handleInfo = () => {
    setonInfo(!onInfo);
  };
  const navigation = useNavigation();
  const {
    handleSubmit,
    question,
    managerJoin,
    joined,
    HandleActionable,
    remark,
    setremark,
    dropDown,
    setdropDown,
    setrating,
    rmmactionable,
    setrmmactionable,
    bmActionable,
    setbmActionable,
    questionList,
    setyesNo,
    quality,
    setquality,
    checkedAns,
    setcheckedAns,
    yesNo,
    startAudit,
    setstartAudit,
    getIMG,
    onCapture,
  } = props;

  const handleRating = async (item) => {
    await setdefaultRating(item);
    await setrating(item);
  };
  function _handleReivew(val) {
    props.setReviewValue(val);
    props.emitRating(val);
    if (val > 0) {
      props.HandleActionable(0);
      props.setshowActionable(false);
    } else {
      props.setshowActionable(true);
    }
  }
  const handleRemark = (val) => {
    setremark(val);
    props.emitRemark(val);
  };
  const handleDropDown = () => {
    setdropDown(!dropDown);
  };

  const HandleAns = (index, question) => {
    setshowIndex(index);
    setcheckedAns(question);
  };

  const OpenGallery = () => {
    Geolocation.getCurrentPosition(
    async  position => {
        const {latitude, longitude} = position.coords;
        const res = await getLocation(latitude, longitude);
        console.log("LocationName --->> ", res);
        console.log("Postion ----->>>",position);
     const currentTime = new Date();
     const year = currentTime.getFullYear();
     const month = currentTime.getMonth()+1;
     const day = currentTime.getDate();
     
     const hours = currentTime.getHours()%12 || currentTime.getHours();
     const minutes = currentTime.getMinutes();
     const seconds = currentTime.getSeconds();

     const amPm = hours>=12 ? 'P.M.' : 'A.M.';
    

     const formattedDate = `${day<10 ? '0': ''}${day}-${month<10 ? '0': ''}${month}-${year}`;
     const formattedTime = `${hours <10 ? '0': ''}${hours}:${minutes<10 ? '0': ''}${minutes}:${seconds<10 ? '0': ''}${seconds} ${amPm}`;
   
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.5,
    }) 
    .then((image) => {
    console.log('image: ', image?.path);
  
        // const originalPath = image?.path;
        // const originalImageDirectory = originalPath.substring(0, originalPath.lastIndexOf('/'));
        const originalImageDirectory = "file:///storage/emulated/0/Android/data/com.audit.Kreate/files/Pictures";
        console.log("The original path --->",originalImageDirectory);
        const fileName = 'markedImage_'+ new Date().getTime() + '.jpg';
        const destinationImagePath = originalImageDirectory+ '/' + fileName;

        const options = {
          backgroundImage: {
            src : {uri : image?.path},
            scale: 1,
          },
          watermarkTexts: [{
            text:  `${res} \n Time: ${formattedDate} ${formattedTime}`,
            positionOptions: {
              //  X : 0,
              // Y : 400
              position: Position.bottomCenter,
            },
            style: {
              color: BLACK_COLOR,
              fontSize: 8,
              fontName: FONT_FAMILY_THIN,
              marginBottom: 5
            },
            textBackgroundStyle: {
              padding: '10% 20%',
              type: TextBackgroundType.stretchX,
              marginHorizontal: 10
              // color: '#0FFF00',
            },
          }],
          scale: 1,
          quality: 100,
          filename: 'test',
          maxSize: 1000,
        }; 

       ImageMarker.markText(options
        ).then((markedImagePath)=> {
          console.log('Marked image path: ', markedImagePath);
        RNFS.moveFile(markedImagePath, destinationImagePath)
         .then(() => {
           console.log('Marked image saved at: ', destinationImagePath);
           const imageWithMetaData = {
            path : destinationImagePath,
            type : 'gallery',
            location : {latitude, longitude},
            time : currentTime.toString()
          }
          let combineImg = props.camImg == null ? [] : [...props.camImg];
            combineImg.push(imageWithMetaData);
            props.setCamImg(combineImg);
            setssDropDown(false);
       }).catch((moveError) => {
           console.error('Error moving file:', moveError);
       });
          }).catch((error) => {
              console.error("Error handling the marker text on image :-", error);
          });
      setssDropDown(false);
    });
   },  error => {
       console.log("This is the error",error);
        }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
   
  };
 
  const OpenCamera = async () => {
    Geolocation.getCurrentPosition(
     async position => {
        const {latitude, longitude} = position.coords;
       const res = await getLocation(latitude, longitude);
       console.log("LocationName --->> ", res);
       console.log("Postion ----->>>",position);
        
     const currentTime = new Date();
     const year = currentTime.getFullYear();
     const month = currentTime.getMonth()+1;
     const day = currentTime.getDate();
     
     const hours = currentTime.getHours()%12 || currentTime.getHours();
     const minutes = currentTime.getMinutes();
     const seconds = currentTime.getSeconds();

     const amPm = hours >=12 ? 'P.M.': 'A.M.';

     const formattedDate = `${day<10 ? '0': ''}${day}-${month<10 ? '0': ''}${month}-${year}`;
     const formattedTime = `${hours <10 ? '0': ''}${hours}:${minutes<10 ? '0': ''}${minutes}:${seconds<10 ? '0': ''}${seconds} ${amPm}`;
   
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.5,
    }) 
    .then((image) => {
    console.log('image: ', image?.path);

    const originalPath = image?.path;
    const originalImageDirectory = originalPath.substring(0, originalPath.lastIndexOf('/'));
    console.log("The original path --->",originalImageDirectory);
    const fileName = 'markedImage_'+ new Date().getTime() + '.jpg';
    const destinationImagePath = originalImageDirectory+ '/' + fileName;
      setssDropDown(false);

      const options = {
        backgroundImage: {
          src : {uri : image?.path},
          scale: 1,
        },
        watermarkTexts: [{
          text:  `${res} \n ${formattedDate} ${formattedTime}`,
          positionOptions: {
            // X: 10,
            // Y: 10,
            position: Position.bottomCenter,
          },
          style: {
            color: BLACK_COLOR,
            fontSize: 8,
            fontName: FONT_FAMILY_THIN,
            marginBottom: 5,
          },
          textBackgroundStyle: {
            padding: '10%',
            type: TextBackgroundType.stretchX,
            // color: '#0FFF00',
            // backgroundColor: 'blue'
          },
        }],
        scale: 1,
        quality: 100,
        filename: 'test',
        // saveFormat: ImageFormat.png,
        maxSize: 1000,
      };

    ImageMarker.markText(options
    ).then((markedImagePath)=> {
        console.log('Marked image path: ', markedImagePath);
      RNFS.moveFile(markedImagePath, destinationImagePath)
       .then(() => {
         console.log('Marked image saved at: ', destinationImagePath);
         const imageWithMetaData = {
          path : destinationImagePath,
          type : 'camera',
          location : {latitude, longitude},
          time : currentTime.toString()
        }
          let combineImg = props.camImg == null ? [] : [...props.camImg];
          combineImg.push(imageWithMetaData);
          props.setCamImg(combineImg);
          setssDropDown(false);
  })
  .catch((moveError) => {
    console.error('Error moving file:', moveError);
  });
    }).catch((error) => {
         console.error("Error handling the marker text on image :-", error);
    });
 
  });
     //Adding details to image   
  }, error => {
    console.log("This is the error",error);
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const renderImage = (item, index) => {
    return question.audit_type === 0 ? (
      <TouchableOpacity
        style={{ width: 60, height: 65, marginHorizontal: 5 }}
        onPress={() => showMaxIMG(index)}
      >
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            position: "absolute",
            zIndex: 9,
            backgroundColor: "#fff",
            right: 0,
            top: 0,
          }}
          onPress={() => props.confirmDelete(index)}
        >
          <Image
            source={require("../../../../assets/images/add-alt.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: PRIMARY_BLUE_COLOR,
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
    ) : (
      <TouchableOpacity
        style={{ width: 60, height: 65, marginHorizontal: 5 }}
        onPress={() => showMaxIMG(index)}
      >
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            position: "absolute",
            zIndex: 9,
            backgroundColor: "#fff",
            right: 0,
            top: 0,
          }}
          onPress={() => props.confirmDelete(index)}
        >
          <Image
            source={require("../../../../assets/images/add-alt.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: PRIMARY_BLUE_COLOR,
            }}
          />
        </TouchableOpacity>
        <View>
          <Image
            source={{ uri: props.baseUrl + item.image_data }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const showMaxIMG = (index) => {
    setshowModalIMG(props.camImg[index]);
    setmaxIMG(!maxIMG);
  };
  const showModal = () => {
    setssDropDown(!ssDropDown);
  };
  // console.log("StartAudit;", startAudit);
  return (
    <View style={styles.container}>
      {/* <Header leftImg={ARROW} headerText={`Question - ${question?.data?.item_number}`} onPress={() => navigation.goBack()} /> */}
      {/* <ScrollView keyboardShouldPersistTaps={"always"} contentContainerStyle={{ flexGrow: 1, }}> */}
      {startAudit === 2 ? (
        <Header
          leftImg={LEFT_ARROW}
          headerText={"Start Audit"}
          onPress={() => navigation.goBack()}
        />
      ) : //  : startAudit === 4 ? (
      //   <Header
      //     headerText={"Audit Actionable Review"}
      //     onPress={() => {
      //       navigation.openDrawer();
      //     }}
      //   />
      // )
      null}
      <View style={styles.mainvwe}>
        {startAudit === 1 ? (
          <>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 1,
                zIndex: 10,
                padding: 10,
              }}
              onPress={() => handleInfo()}
            >
              <Image source={INFO_ICON} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            {onInfo && (
              <View style={styles.info}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.info_txt}>More information</Text>
                  <TouchableOpacity onPress={() => handleInfo()}>
                    <Image
                      source={CROSS}
                      style={{
                        tintColor: PRIMARY_BLUE_COLOR,
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.info_ptxt}>
                  Photo requirment : Mondatory
                </Text>
                <Text style={styles.info_ptxt}>
                  Remark requirment : Optional
                </Text>
                <Text style={styles.info_ptxt}>is RMM Actionable : Yes</Text>
                <Text style={styles.info_ptxt}>is Admin Actionable : No</Text>
                <Text style={styles.info_ptxt}>
                  is Branch Manager Actionable : Yes
                </Text>
              </View>
            )}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Image
                  source={LEFT_ARROW}
                  style={{
                    tintColor: PRIMARY_BLUE_COLOR,
                    width: 20,
                    height: 20,
                    justifyContent: "flex-start",
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={
                    ([styles.branname],
                    { fontFamily: FONT_FAMILY_BOLD, color: "#000" })
                  }
                >
                  {question?.data?.question_title}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.txt,
                {
                  marginTop: 10,
                  fontWeight: "600",
                  fontSize: normalize(SMALL_FONT_SIZE),
                },
              ]}
            >
              {question?.data?.audit_question}
            </Text>
          </>
        ) : null}
        {managerJoin && maxIMG ? (
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
                  top: 0,
                }}
                onPress={() => showMaxIMG()}
              >
                <Image
                  source={require("../../../../assets/images/add-alt.png")}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: PRIMARY_BLUE_COLOR,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{ alignItems: "center", marginTop: 150, padding: 10 }}
              >
                {console.log("showModalIMG.path", showModalIMG)}
                <Image
                  source={{ uri: props.baseUrl + showModalIMG.image_data }}
                  style={{ width: "100%", height: 300, resizeMode: "contain" }}
                />
              </View>
            </View>
          </Modal>
        ) : null}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps={"always"}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {question?.audit_type == 0 ? null : (
              
              <View style={{ height: 250 }}>
                {console.log("🚀 ~ file: Question.js:408 ~ Question ~ question?.audit_type:", question?.audit_type)
                  }
                  {
                    alert(props.token+"--------"+props.channelId)
                  }
                {

                  
                  
                  <JoinChannelVideo
                    handleManagerJoin={(data) => props.handleManagerJoin(data)}
                   /*  token={props.token}
                    channelId={props.channelId} */
                    token="006b13f7540466747e6a102327255673a59IAAKqV6kHwDel5jrgEFAIu5fQla/AGJILodDtU+ndeniAU408aQh39v0EABOtBKIlZt5ZAEAAQDt1Hlk"
                    channelId="10792279510792M6391"
                    setmanagerJoin={() => {}}
                    handleJoin={(data) => props.handleJoin(data)}
                  />
                }
              </View>
            )}
            {startAudit === 1 ? (
             
              <View style={styles.body}>
                {question?.data?.image_capture === "1" && (
                  <>
                    {props?.camImg && !props.managerJoin ? (
                      <View style={{ alignItems: "center", marginTop: 10 }}>
                        {props.camImg.length > 0 ? (
                          <Image
                            source={{
                              uri: props.camImg[props.camImg.length - 1].path,
                            }}
                            style={{
                              width: "100%",
                              height: 300,
                              borderRadius: 10,
                              resizeMode: "contain",
                            }}
                          />
                        ) : null}
                      </View>
                    ) : null}

                    <View style={styles.brnchmannme}>
                      {props.showCapIMG ? (
                        <TouchableOpacity
                          onPress={() => {
                            question?.audit_type == 0
                              ? showModal()
                              : onCapture();
                          }}
                          style={{
                            backgroundColor: "#1b7dec",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "700",
                              color: "#ffffff",
                            }}
                          >
                            Capture The image
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                      {ssDropDown && (
                        <Modal transparent={true}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#004c8f95",
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "#fff",
                                width: "100%",
                                position: "absolute",
                                bottom: 0,
                                paddingVertical: 40,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginHorizontal: 10,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#000",
                                    color: "#000",
                                    fontFamily: FONT_FAMILY_REGULAR,
                                    fontSize: normalize(SMALL_FONT_SIZE),
                                  }}
                                >
                                  Choose from
                                </Text>
                                <TouchableOpacity
                                  onPress={() => setssDropDown(!ssDropDown)}
                                >
                                  <Image source={CROSS} />
                                </TouchableOpacity>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <TouchableOpacity
                                  style={{ alignItems: "center" }}
                                  onPress={() => OpenCamera()}
                                >
                                  <Image
                                    source={CAMERA}
                                    style={{
                                      width: 30,
                                      height: 30,
                                      resizeMode: "contain",
                                      tintColor: PRIMARY_BLUE_COLOR,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontFamily: FONT_FAMILY_REGULAR,
                                    }}
                                  >
                                    Camera
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={{ alignItems: "center" }}
                                  onPress={() => OpenGallery()}
                                >
                                  <Image
                                    source={GALLERY}
                                    style={{
                                      width: 30,
                                      height: 30,
                                      resizeMode: "contain",
                                      tintColor: PRIMARY_BLUE_COLOR,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "#000",
                                      fontFamily: FONT_FAMILY_REGULAR,
                                    }}
                                  >
                                    Gallery
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      )}
                    </View>
                    <View style={styles.img_sec}>
                      <View style={styles.d_sec_img}>
                        <View style={{}}>
                          <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={props.camImg}
                            horizontal={true}
                            pagingEnabled={true}
                            renderItem={({ item, index }) => {
                              return renderImage(item, index);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </>
                )}

                {question?.data?.question_type === "1" && (
                  <View style={styles.brnchmannme}>
                    <Button
                      buttonText={"Yes"}
                      style={{
                        paddingVertical: 5,
                        backgroundColor:
                          yesNo === "YES"
                            ? DARK_BLUE_COLOR
                            : PRIMARY_BLUE_COLOR,
                      }}
                      onPress={() => {
                        props.setyesNo("YES");
                        props.setrevActionable(0);
                        handleRemark(question.data.remark_yes);
                        props.handleShowActionable(false);
                        if (question.data.score_range == 1)
                          props.showSetRange(true);
                      }}
                    />
                    <Button
                      buttonText={"No"}
                      style={{
                        paddingVertical: 5,
                        backgroundColor:
                          yesNo === "NO" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR,
                      }}
                      onPress={() => {
                        props.setyesNo("NO");
                        props.setrevActionable(1);
                        handleRemark(question.data.remark_no);
                        props.handleShowActionable(true);
                        if (question.data.score_range == 1)
                          props.showSetRange(false);
                        if (question.data.action_on_no == 3) {
                          props.HandleActionable(0);
                          props.setshowActionable(false);
                        }
                      }}
                    />
                    {/* <Button buttonText={"NA"} style={{ paddingVertical: 5, backgroundColor: yesNo === "NA" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR }} onPress={() => props.setyesNo('NA')} /> */}
                  </View>
                )}
                {question?.data?.question_type === "5" && (
                  <View style={styles.brnchmannme}>
                    <Button
                      buttonText={"Yes"}
                      style={{
                        paddingVertical: 5,
                        backgroundColor:
                          yesNo === "YES"
                            ? DARK_BLUE_COLOR
                            : PRIMARY_BLUE_COLOR,
                      }}
                      onPress={() => {
                        props.setyesNo("YES");
                        handleRemark(question.data.remark_yes);
                        props.handleShowActionable(false);
                        if (question.data.score_range == 1)
                          props.showSetRange(true);
                      }}
                    />
                    <Button
                      buttonText={"No"}
                      style={{
                        paddingVertical: 5,
                        backgroundColor:
                          yesNo === "NO" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR,
                      }}
                      onPress={() => {
                        props.setyesNo("NO");
                        handleRemark(question.data.remark_no);
                        props.handleShowActionable(true);
                        if (question.data.score_range == 1)
                          props.showSetRange(false);
                        if (question.data.action_on_no == 3) {
                          props.HandleActionable(0);
                          props.setshowActionable(false);
                        }
                      }}
                    />
                    <Button
                      buttonText={"NA"}
                      style={{
                        paddingVertical: 5,
                        backgroundColor:
                          yesNo === "NA" ? DARK_BLUE_COLOR : PRIMARY_BLUE_COLOR,
                      }}
                      onPress={() => {
                        props.setshowActionable(false);
                        props.setyesNo("NA");
                        setremark("");
                        props.HandleActionable(0);
                      }}
                    />
                  </View>
                )}
                {question?.data?.question_type === "2" && (
                  <View style={styles.brnchmannme}>
                    <TextInput
                      placeholder="Enter the quantity"
                      value={quality}
                      onChangeText={(text) => {
                        props.handleQuality(text);
                      }}
                      keyboardType={"numeric"}
                      style={{
                        padding: 10,
                        backgroundColor: "#ecececec",
                        width: "100%",
                      }}
                    />
                  </View>
                )}
                {question?.data?.check_box_type == 1 && (
                  <>
                    <Text style={styles.branname}>
                      Select Appropriate Creatives from List
                    </Text>
                    <View style={{ flexDirection: "column" }}>
                      {props.questionList.map((list, index) => (
                        <TouchableOpacity
                          style={{ flexDirection: "row", marginBottom: 5 }}
                          key={index}
                          onPress={() =>
                            props.handleCheckList(index, list.name)
                          }
                        >
                          <Image
                            source={
                              list.isSelected ? CHECKED_FILLED : UNCHECKED
                            }
                            style={{
                              width: 20,
                              height: 20,
                              marginRight: 10,
                              resizeMode: "contain",
                            }}
                          />
                          <Text>{list.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
                {question?.data?.question_type === "4" && (
                  <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                    {/* <Text style={styles.txt}>Answer the following question</Text> */}
                    {questionList &&
                      questionList.map((question, index) => {
                        return (
                          <TouchableOpacity
                            style={{ flexDirection: "row", marginBottom: 5 }}
                            onPress={() => HandleAns(index, question)}
                            key={index}
                          >
                            <Image
                              source={
                                showIndex === index
                                  ? CHECKED_FILLED
                                  : UNCHECKED_ICON
                              }
                              style={{ width: 20, height: 20, marginRight: 5 }}
                            />
                            <Text
                              style={{
                                fontSize: normalize(12),
                                fontFamily: FONT_FAMILY_REGULAR,
                                color:
                                  showIndex === index
                                    ? PRIMARY_BLUE_COLOR
                                    : "#000",
                              }}
                            >
                              {question}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                )}
                {question?.data?.score_range_to > 1 ? (
                  <View style={{}}>
                    <Text style={styles.branname}>Rating</Text>
                    <View style={{ alignItems: "center" }}>
                      <Text>
                        Rating:{" "}
                        <Text
                          style={{
                            color: PRIMARY_BLUE_COLOR,
                            fontFamily: FONT_FAMILY_SEMI_BOLD,
                          }}
                        >
                          {props.reviewValue}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flex: 0.5,
                          justifyContent: "center",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            color: PRIMARY_BLUE_COLOR,
                            fontFamily: FONT_FAMILY_SEMI_BOLD,
                          }}
                        >
                          {" "}
                          {question?.data.score_range_from}
                        </Text>
                      </View>
                      <Slider
                        style={{ height: 40, flex: 5 }}
                        minimumValue={question?.data.score_range_from}
                        maximumValue={question?.data.score_range_to}
                        minimumTrackTintColor={PRIMARY_BLUE_COLOR}
                        maximumTrackTintColor="#000000"
                        value={props.reviewValue}
                        thumbTintColor={PRIMARY_BLUE_COLOR}
                        step={1}
                        onValueChange={(val) => _handleReivew(val)}
                      />
                      <View style={{ flex: 0.5 }}>
                        <Text
                          style={{
                            color: PRIMARY_BLUE_COLOR,
                            fontFamily: FONT_FAMILY_SEMI_BOLD,
                          }}
                        >
                          {question?.data?.score_range_to}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}
                {props.showActionable ? (
                  question?.data?.rmm_actionable_assignee === "1" ||
                  question?.data?.bm_actionable_assignee === "1" ||
                  question?.data?.admin_assignee === 1 ||
                  question?.data?.atm_cordinator_assignee === 1 ? (
                    <View style={{ marginTop: 20 }}>
                      <Text style={styles.branname}>Actionable</Text>
                      <TouchableOpacity
                        onPress={() => handleDropDown()}
                        style={{
                          backgroundColor: GREY_TEXT_COLOR,
                          flexDirection: "row",
                          alignItems: "center",
                          borderRadius: 5,
                          justifyContent: "space-between",
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={{ fontFamily: FONT_FAMILY_REGULAR }}>
                          {bmActionable
                            ? "BM"
                            : rmmactionable
                            ? "RMM"
                            : props.adminActionable
                            ? "Admin"
                            : props.atmActionable
                            ? "ATM Cordinator"
                            : "Assign to"}
                        </Text>
                        {dropDown ? (
                          <Image
                            source={DOWNARROW}
                            style={{ transform: [{ rotateZ: "180deg" }] }}
                          />
                        ) : (
                          <Image source={DOWNARROW} />
                        )}
                      </TouchableOpacity>
                      {dropDown && (
                        <View style={{ backgroundColor: GREY_TEXT_COLOR }}>
                          {props?.revActionable == 1 ? (
                            <TouchableOpacity
                              style={styles.drop_down_item}
                              onPress={() => {
                                HandleActionable(0);
                                props.setdropDown(false);
                              }}
                            >
                              <Text style={styles.drop_down_txt}>
                                Remove actionable
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                          {question?.data.bm_actionable_assignee == "1" ? (
                            <TouchableOpacity
                              style={styles.drop_down_item}
                              onPress={() => HandleActionable(1)}
                            >
                              <Text style={styles.drop_down_txt}>
                                {/* {question?.branch_manager} */}
                                BM
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                          {question?.data.rmm_actionable_assignee == "1" ? (
                            <TouchableOpacity
                              style={styles.drop_down_item}
                              onPress={() => HandleActionable(2)}
                            >
                              <Text style={styles.drop_down_txt}>
                                {/* {userData.name} */}
                                RMM
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                          {question?.data.atm_cordinator_assignee == 1 ? (
                            <TouchableOpacity
                              style={styles.drop_down_item}
                              onPress={() => HandleActionable(3)}
                            >
                              <Text style={styles.drop_down_txt}>
                                {"ATM Cordinator"}
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                          {question?.data.admin_assignee == 1 ? (
                            <TouchableOpacity
                              style={styles.drop_down_item}
                              onPress={() => HandleActionable(4)}
                            >
                              <Text style={styles.drop_down_txt}>
                                {"Admin"}
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      )}
                    </View>
                  ) : null
                ) : null}
                {question?.data?.remark === "1" && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.branname}>Actionable/ Remarks </Text>
                    <TextInput
                      placeholder="Remarks"
                      multiline
                      numberOfLines={3}
                      style={styles.input}
                      value={remark !== "undefined" ? remark : ""}
                      onChangeText={(text) => handleRemark(text)}
                    />
                  </View>
                )}

                <View
                  style={{
                    marginVertical: 20,
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <Button
                      disabled={props.disableBtn == 0 ? true : false}
                      buttonText={"Previous"}
                      style={
                        props.disableBtn == 0 && { backgroundColor: "gray" }
                      }
                      onPress={() => props.prevQuestion()}
                    />
                    <Button
                      disabled={props.disableBtn == 0 ? true : false}
                      buttonText={"Next"}
                      style={
                        props.disableBtn == 0 && { backgroundColor: "gray" }
                      }
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              </View>
            ) : //   </ScrollView>
            // </KeyboardAvoidingView>
            startAudit === 2 ? (
              <Notify
                managerJoin={managerJoin}
                joined={joined}
                setstartAudit={setstartAudit}
                bmJoined={props.bmJoined}
              />
            ) : startAudit === 3 ? (
              <AuditScoreScreen setstartAudit={setstartAudit} />
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};
export default Question;
