import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Actionable from "./component/Actionable";
import ImagePicker from "react-native-image-crop-picker";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../utils/Loader";
export default function index({ navigation, route }) {
  const data = route.params;
  const [next, setnext] = useState(false);
  const [camImg, setcamImg] = useState();
  const [remark, setremark] = useState();
  const [ID, setID] = useState('')
  const [isLoading, setisLoading] = useState(false);
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
  const HandleUpdate = async () => {
    try {
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
        HandleUpdate={HandleUpdate}
      />
    </>
  );
}
