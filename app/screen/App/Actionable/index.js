import React, { useState } from "react";
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
  const [isLoading, setisLoading] = useState(false)
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
      setisLoading(true)
      let formdata = new FormData();
      formdata.append("remark", remark);
      formdata.append("image", camImg);
      formdata.append("type", 2);
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
      console.log("res",response)
      if(response.status===200)
      {
        setisLoading(false)
        setnext(false)
        navigation.goBack()
      }
    } catch (error) {
      setisLoading(false)
      console.log(error);
    }
  };
  return (
    <>
    {isLoading&&<Loader/>}
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
