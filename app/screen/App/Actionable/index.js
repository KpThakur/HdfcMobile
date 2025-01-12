import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import Actionable from "./component/Actionable";
import ImagePicker from "react-native-image-crop-picker";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../utils/Loader";
import {
  FONT_FAMILY_REGULAR,
  PRIMARY_BLUE_COLOR,
  GALLERY,
  SMALL_FONT_SIZE,
  CROSS,
  CAMERA,
} from "../../../utils/constant";
import { normalize } from "../../../utils/scaleFontSize";
import { LoadingContext } from "../../../utils/LoadingContext";
export default function Index({ navigation, route }) {
  const data = route.params ||{};
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [next, setnext] = useState(false);
  const [camImg, setcamImg] = useState();
  const [remark, setremark] = useState("");
  const [ID, setID] = useState("");
  const [isLoading, setisLoading] = useContext(LoadingContext);
  // const [isLoading, setisLoading] = useState(false);
  const [ssDropDown, setssDropDown] = useState(false);
  const [work, setwork] = useState(0);
  useEffect(() => {
    getActionable();
  }, []);
  useEffect(() => {
    if (data?.actionable?.length > 0) {
      setcamImg(data.baseURL + data.actionable[0].image);
      setwork(data.actionable[0].work_status);
      setremark(data.actionable[0].actionable_remark);
      setID(data.actionable[0].actionable_id);
    }
  }, []);

  const getActionable = async () => {
    try {
      setisLoading(true);
      const params = {
        question_id: data?.display_next?data?.RM?.question_id:data?.question_id,
        audit_id: data?.display_next?data?.RM?.audit_id:data?.audit_id,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GET_ACTIONABLE,
        params
      );
      if (response.status == 200) {
        setID(response.data.RMM[0].actionable_id);
        setwork(
          response.data.RMM[0].work_status
            ? response.data.RMM[0].work_status
            : 0
        );
        setremark(response.data.RMM[0].actionable_remark);
        setcamImg(response.data.base_url + response.data.RMM[0].image[0]);
        setisLoading(false);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.5,
    }).then((image) => {
      setcamImg(image.path);
      setssDropDown(false);
    });
  };
  const OpenGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: false,
      cropping: false,
      mediaType:'photo',
      compressImageQuality: 0.5,
    }).then((image) => {
      setcamImg(image.path);
      setssDropDown(false);
    });
  };
  const HandleUpdate = async (type) => {
    if (camImg) {
      try {
        setisLoading(true);
        let formdata = new FormData();
        formdata.append("remark", remark);
        formdata.append("image", {
          uri: camImg,
          type: camImg.mime === undefined ? "image/jpeg" : camImg.mime,
          name: camImg.substring(camImg.lastIndexOf("/") + 1),
        });
        formdata.append("type", type);
        formdata.append("work_status", work);
        formdata.append("audit_id", data.audit_id);
        formdata.append("question_id", data.question_id);
        formdata.append("actionable_id", ID);
        const response = await apiCall(
          "POST",
          apiEndPoints.ACTIONABLE_SUBMIT,
          formdata,
          {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        );
        console.log('response: ', response);
        if (response.status === 200) {
          setisLoading(false);
          setnext(false);
          // navigation.navigate("DashboardScreen");
          navigation.goBack(null)
        }else {
          setisLoading(false);
          Alert.alert("", response?.data?.message);
        }
      } catch (error) {
        setisLoading(false);
        console.log("HandleUpdate err: ",error);
      }
    } else {
      alert("Please upload image");
    }
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}
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
        work={work}
        setwork={setwork}
      />
      {ssDropDown && (
        <Modal transparent onRequestClose={() => setssDropDown(false)}>
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
                <TouchableOpacity onPress={() => setssDropDown(!ssDropDown)}>
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
    </>
  );
}
