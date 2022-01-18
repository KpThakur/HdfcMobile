import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image, Dimensions } from "react-native";
import Actionable from "./component/Actionable";
import ImagePicker from "react-native-image-crop-picker";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../utils/Loader";
import { FONT_FAMILY_REGULAR,PRIMARY_BLUE_COLOR,GALLERY, SMALL_FONT_SIZE,CROSS,CAMERA } from "../../../utils/constant";
import { normalize } from "../../../utils/scaleFontSize";
export default function index({ navigation, route }) {
  const data = route.params;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [next, setnext] = useState(false);
  const [camImg, setcamImg] = useState();
  const [remark, setremark] = useState();
  const [ID, setID] = useState('')
  const [isLoading, setisLoading] = useState(false);
  const [ssDropDown, setssDropDown] = useState(false)
  useEffect(() => {
    getActionable();
    
  }, []);
  const getActionable = async () => {
    try {
      setisLoading(true)
      const params = {
        question_id: data.RM.question_id,
        audit_id: data.RM.audit_id,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GET_ACTIONABLE,
        params
      );
      if (response.status == 200) {
        setID(response.data.RMM[0].actionable_id)
        setremark(response.data.RMM[0].actionable_remark);
        setcamImg(response.data.base_url+response.data.RMM[0].image[0])
        setisLoading(false)
      }
      setisLoading(false)
    } catch (error) {
      setisLoading(false)
      console.log(error);
    }
  };
  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then((image) => {
      setcamImg(image.path);
    });
  };
  const OpenGallery = () => {
    ImagePicker.openPicker({
      width: windowWidth,
      height: windowHeight / 2,
      multiple: false,
      cropping: false,
    }).then((image) => {
      setcamImg(image.path);
      setssDropDown(false);
    });
  };
  const HandleUpdate = async () => {
    try {
      if(camImg){
      setisLoading(true);
      let formdata = new FormData();
      formdata.append("remark", remark);
      formdata.append("image", {
        uri: camImg,
        type: camImg.mime === undefined ? "image/jpeg" : camImg.mime,
        name: camImg.substring(camImg.lastIndexOf("/") + 1),
      });
      formdata.append("type", 2);
      formdata.append("actionable_id", ID);
      formdata.append("audit_id", data.RM.audit_id);
      formdata.append("question_id", data.RM.question_id);
      const response = await apiCall(
        "POST",
        apiEndPoints.ACTIONABLE_SUBMIT,
        formdata,
        {
          "Content-Type": "multipart/form-data",
          "cache-control": "no-cache",
          processData: false,
          contentType: false,
          mimeType: "multipart/form-data",
        }
      );
      if (response.status === 200) {
        setisLoading(false);
        setnext(false);
        navigation.goBack();
      }}else{
        alert("Please upload image")
      }
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  
  return (
    <>
      {isLoading && <Loader />}
      <Actionable
        next={next}
        data={data}
        camImg={camImg}
        setcamImg={setcamImg}
        OpenCamera={OpenCamera}
        remark={remark}
        setremark={setremark}
        setnext={setnext}
        setssDropDown={setssDropDown}
        HandleUpdate={HandleUpdate}
      />
      {ssDropDown && (
                      <Modal transparent={true}
                      onRequestClose={()=>setssDropDown(false)}
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
                      </Modal>
                    )}
    </>
  );
}
