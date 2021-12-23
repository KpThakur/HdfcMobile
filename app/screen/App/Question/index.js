import React, { useContext, useEffect, useState } from "react";
import { Alert, Platform, Share } from "react-native";
import QuestionView from "./components/Question";
import { QuestionContext } from "../../../utils/QuestionContext";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../utils/Loader";
import { socket } from "../../../utils/Client";
import { UserContext } from "../../../utils/UserContext";
import NetInfo from "@react-native-community/netinfo";
import FormData from "form-data";
const Question = ({ navigation, route }) => {
  const [question, setquestion] = useContext(QuestionContext);
  const [remark, setremark] = useState("");
  const [rating, setrating] = useState(0);
  const [rmmactionable, setrmmactionable] = useState(0);
  const [bmActionable, setbmActionable] = useState(0);
  const [atmActionable, setatmActionable] = useState(0);
  const [adminActionable, setadminActionable] = useState(0);
  const [questionList, setquestionList] = useState();
  const [yesNo, setyesNo] = useState();
  const [quality, setquality] = useState(0);
  const [checkedAns, setcheckedAns] = useState("");
  const [camImg, setCamImg] = useState([]);
  const [sliderValue, setSliderValue] = useState("");
  const [reviewValue, setReviewValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [startAudit, setstartAudit] = useState();
  const [joined, setjoined] = useState(true);
  const [bmJoined, setBmJoined] = useState(false);
  const [managerJoin, setmanagerJoin] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [userData, setuserData] = useContext(UserContext);
  const [showActionable, setshowActionable] = useState(true);
  const [showCapIMG, setshowCapIMG] = useState(true);
  useEffect(() => {
    setstartAudit(question?.audit_type == 0 ? true : false);
    unsubscribe;
    setremark(question?.data.actionsble_remark);
    emitRemark(question?.data.actionsble_remark);
    //setshowActionable(true)
    //setshowActionable(question?.data.count_actionable===1?true:false)
  }, []);
  useEffect(() => {}, [question]);
  useEffect(() => {
    socket.on("image-sent", (data) => {
      if (data.socketEvent == "updateCaptureimage" + question?.audit_id) {
        getIMG();
      }
    });
  }, []);
  useEffect(() => {
    if (startAudit === true) {
      const params = {
        question_id: question?.data?.question_id,
        audit_id: question?.audit_id,
      };
      socket.emit("startAudit", params, async (data) => {});
    }
  }, [startAudit]);

  const unsubscribe = NetInfo.fetch().then((state) => {
    setjoined(state.isConnected);
  });

  const SubmitAPI = async (formdata) => {
    try {
      setisLoading(true);
      const response = await apiCall(
        "POST",
        apiEndPoints.SUBMIT_QUESTION,
        formdata,
        {
          "Content-Type": "multipart/form-data",
          "cache-control": "no-cache",
          processData: false,
          contentType: false,
          mimeType: "multipart/form-data",
        }
      );
      // console.log("RES: ", response);

      // console.log("STATUS: ", response.status);
      if (response.data.status === 200) {
        handleNext();
      } else if (response.data.status !== 500) {
        alert(response.data.message);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  const handleSubmit = async () => {
    NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        setisLoading(true);
        let formdata = new FormData();
        formdata.append("audit_id", question?.audit_id);
        formdata.append("question_id", question?.data.question_id);
        formdata.append("remark", remark);
        formdata.append("score_range", reviewValue);
        formdata.append("rmm_actionable_assignee", rmmactionable);
        formdata.append("bm_actionable_assignee", bmActionable);
        formdata.append("admin_assignee", adminActionable);
        formdata.append("atm_cordinator_assignee", atmActionable);
        formdata.append("yes_no", yesNo);
        formdata.append("quality", quality);
        formdata.append("check_answer", checkedAns);
        if (
          question?.data.question_type === "3" ||
          question?.data.image_capture === "1"
        ) {
          if (camImg) {
            if (question.audit_type !== 1) {
              camImg?.map((img, index) => {
                return formdata.append("question_image", {
                  uri: img.path,
                  type: img.mime === undefined ? "image/jpeg" : img.mime,
                  name: img.path.substring(img.path.lastIndexOf("/") + 1),
                });
              });
            } else {
            }
            SubmitAPI(formdata);
          } else {
            setisLoading(false);
            !showCapIMG
              ? SubmitAPI(formdata)
              : alert("Please Capture The Image");
          }
        } else {
          SubmitAPI(formdata);
        }
      } else {
        alert("Poor Connection");
      }
    });
  };

  const handleNext = async () => {
    const params = {
      question_id: question?.data?.question_id,
      audit_id: question?.audit_id,
      audit_type: question?.audit_type,
      employee_id: userData?.emp_id,
      branch_manager: question?.branch_manager,
    };
    socket.emit("getQuestionList", params, async (data) => {
      if (data.socketEvent == "getQuestionList" + question?.audit_id) {
        await GetSocketData(data, params);
      } else {
        const params = {
          audit_id: question?.audit_id,
          audit_status: 5,
        };
        const response = await apiCall(
          "POST",
          apiEndPoints.CANCEL_AUDIT,
          params
        );
        if (response.status === 200) navigation.navigate("AuditScore");
        else navigator.navigate("DashboardScreen");
      }
    });
  };
  const GetSocketData = async (data, params) => {
    if (data.status === 200) {
      if (data.data.check_data)
        setquestionList(data.data.check_data.split(","));
      // setSliderValue(response.data.data)
      setshowCapIMG(true);
      setremark(data.data.actionsble_remark);
      emitRemark(data.data.actionsble_remark);
      //setshowActionable(data.data.count_actionable===1?true:false)
      setshowActionable(true);
      setquestion({
        data: data.data,
        audit_id: params.audit_id,
        audit_type: params.audit_type,
        branch_manager: params.branch_manager,
      });
      const paramss = {
        question_id: data.data.question_id,
        audit_id: params.audit_id,
      };
      socket.emit("startAudit", paramss, (result) => {});
      if (data.answer.length == 0) {
        setrmmactionable(0);
        setbmActionable(0);
        setCamImg();
        setyesNo();
        setquality(0);
        setReviewValue(0);
        setcheckedAns("");
      } else {
        setCamImg();
        if (data.answer.image_capture !== "") {
          const imgs = data.answer.image_capture.split(",");
          const finalData = [];
          for (var i = 0; i < imgs.length; i++) {
            finalData.push({
              path: data.base_url + imgs[i],
              type: "camera",
              image_data: imgs[i],
            });
          }
          setCamImg([...finalData]);
        }
        setremark(data.answer.remark);
        setrmmactionable(data.answer.rmm_actionable_assignee);
        setbmActionable(data.answer.bm_actionable_assignee);
        setyesNo(data.answer.yes_no);
        setquality(data.answer.quality);
        setReviewValue(Number(data.answer.score_range));
        setcheckedAns(data.answer.check_answer);
      }

      await socket.emit("checker", params);
    } else {
      const params = {
        audit_id: question?.audit_id,
        audit_status: 5,
      };
      await socket.emit("completeAudit", params);
      const response = await apiCall("POST", apiEndPoints.CANCEL_AUDIT, params);
      if (response.status === 200) navigation.navigate("AuditScore");
      else navigator.navigate("DashboardScreen");
    }
  };

  const emitRating = (val) => {
    var params = {
      audit_id: question?.audit_id,
      val: val,
    };
    socket.emit("ratingview", params);
  };
  const emitRemark = (val) => {
    var params = {
      audit_id: question?.audit_id,
      val: val,
    };
    socket.emit("remarkview", params);
  };
  const onCapture = async () => {
    setisLoading(true)
    const params = {
      audit_id: question?.audit_id,
      question_id: question?.data?.question_id,
    };
    console.log("onCapture",params);
    socket.emit("captureImageRequest", params, (data) => {
      console.log("onCapture=>",data)
      if (data.status === 200) {
        console.log("onCapture status 200")
        socket.on("image-sent", (data) => {
          console.log("onCapture====>",data)
          if (data.socketEvent == "updateCaptureimage" + question?.audit_id+question?.data.question_id) {
            console.log("WORking....")
            getIMG();
            setCamImg([...data.image_data]);
          }
          setisLoading(false)
        });
        // getIMG()
      }
    });
  };
  const getIMG = async () => {
    setisLoading(true);
    const params = {
      audit_id: question?.audit_id,
      question_id: question?.data?.question_id,
    };
    console.log("onCapture GET IMG",params);
    socket.emit("customergetImagedata", params, (data) => {
      if (data.socketEvent == "customergetImagedata" + question.audit_id) {
        getIMGSOCKET(data);
        setisLoading(false);
      }
    });
  };
  const getIMGSOCKET = async (data) => {
    console.log("onCapture data of IMG: ",data)
    if (data.status === 200) {
      setBaseUrl(data.base_url);
      setCamImg(data.data);
    }
  };
  const handleManagerJoin = (data) => {
    setmanagerJoin(data);
  };

  const handleJoin = (data) => {
    setBmJoined(data);
  };
  const prevQuestion = async () => {
    try {
      setisLoading(true);
      const params = {
        question_id: question?.data?.question_id,
        audit_id: question?.audit_id,
        audit_type: question?.audit_type,
        employee_id: userData.emp_id,
        branch_manager: question.branch_manager,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.PREV_QUESTION,
        params
      );
      setisLoading(false);
      if (response.status === 200) {
        console.log("prevQuestion: ", response);
        if (response.data.data.check_data)
          setquestionList(response.data.data[0].check_data.split(","));
        if (response.data.answer.image_capture) {
          const imgs = response.data.answer.image_capture.split(",");
          const finalData = [];
          for (var i = 0; i < imgs.length; i++) {
            finalData.push({
              path: response.data.base_url + imgs[i],
              type: "camera",
              image_data: imgs[i],
            });
          }
          setCamImg([...finalData]);
        }
        setquestion({
          data: response.data.data[0],
          audit_id: params.audit_id,
          audit_type: params.audit_type,
          branch_manager: params.branch_manager,
        });
        setremark(response.data.answer.remark);
        setrmmactionable(response.data.answer.rmm_actionable_assignee);
        setbmActionable(response.data.answer.bm_actionable_assignee);

        if (
          response.data.data[0].action_on_yes === 1 &&
          response.data.answer.yes_no == "YES"
        ) {
          setshowActionable(false);
        } else {
          setshowActionable(true);
        }
        setyesNo(response.data.answer.yes_no);
        if (response.data.answer.yes_no == "NO") {
          setshowCapIMG(false);
        }
        setquality(response.data.answer.quality);
        setReviewValue(Number(response.data.answer.score_range));
        setcheckedAns(response.data.answer.check_answer);
        var previous = {
          question_id: question?.data?.question_id,
          audit_id: question?.audit_id,
        };
        await socket.emit("previousquestion", previous, (result) => {});
        var data = {
          data: response.data.data[0],
          audit_id: params.audit_id,
        };
        await socket.emit("customergetImagedata", data, (result) => {});
      } else {
        alert(response.data.message);
      }
    } catch (error) {}
  };
  function deleteImage(index) {
    handleDeleteIMG(camImg[index].image_data);
    var imageArray = [...camImg];
    imageArray.splice(index, 1);
    setCamImg(imageArray);
  }
  const handleDeleteIMG = (name) => {
    const params = {
      image_name: name,
      question_id: question.data.question_id,
      audit_id: question.audit_id,
    };
    socket.emit("deleteCaptureImg", params, (data) => {
      console.log("socket delete", data);
    });
  };
  const confirmDelete = (index) => {
    Alert.alert("Delete Image", "Confirm to delete image.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteImage(index) },
    ]);
  };
  const handleShowActionable = (state) => {
    if (question?.data.action_taken_on_yes === 1) {
      setshowActionable(state);
    }
    if (!state) {
      if (question?.data.action_on_no == 2) {
        setshowCapIMG(true);
        setCamImg();
      }
    }
    if (state) {
      if (question?.data.action_on_no == 2) {
        setshowCapIMG(false);
      }
    }
  };
  const handleQuality = (text) => {
    setquality(text);
    const params = {
      audit_id: question?.audit_id,
      question_id: question?.data?.question_id,
      count_previous_question_id: question?.data?.count_previous_question_id,
      qty: text,
    };
    if (question?.data?.count_previous_question_id != null) {
      socket.emit("CountQuestionType", params, (data) => {
        if (data.data.actioanble == 1) {
          setshowActionable(true);
        } else {
          setshowActionable(false);
        }
      });
    }
  };
  const showSetRange = (state) => {
    if (state) setReviewValue(question.data.set_range_1);
    else setReviewValue(question.data.set_range_2);
  };
  // console.log("ID",question.data);
  console.log("CamIMG: ", camImg);
  return (
    <>
      {isLoading && <Loader />}

      <QuestionView
        baseUrl={baseUrl}
        question={question}
        setquestion={setquestion}
        remark={remark}
        setremark={setremark}
        rating={rating}
        setrating={setrating}
        rmmactionable={rmmactionable}
        setrmmactionable={setrmmactionable}
        bmActionable={bmActionable}
        setbmActionable={setbmActionable}
        questionList={questionList}
        yesNo={yesNo}
        setyesNo={setyesNo}
        quality={quality}
        setquality={setquality}
        checkedAns={checkedAns}
        setcheckedAns={setcheckedAns}
        handleSubmit={handleSubmit}
        camImg={camImg}
        setCamImg={setCamImg}
        sliderValue={sliderValue}
        reviewValue={reviewValue}
        setReviewValue={setReviewValue}
        startAudit={startAudit}
        setstartAudit={setstartAudit}
        joined={joined}
        setjoined={setjoined}
        managerJoin={managerJoin}
        setmanagerJoin={setmanagerJoin}
        onCapture={onCapture}
        getIMG={getIMG}
        handleManagerJoin={handleManagerJoin}
        token={route.params ? route.params.token : ""}
        channelId={route.params ? route.params.channelId : ""}
        handleJoin={handleJoin}
        prevQuestion={prevQuestion}
        handleDeleteIMG={handleDeleteIMG}
        deleteImage={deleteImage}
        confirmDelete={confirmDelete}
        bmJoined={bmJoined}
        emitRating={emitRating}
        emitRemark={emitRemark}
        atmActionable={atmActionable}
        setatmActionable={setatmActionable}
        adminActionable={adminActionable}
        setadminActionable={setadminActionable}
        showActionable={showActionable}
        setshowActionable={setshowActionable}
        handleShowActionable={handleShowActionable}
        handleQuality={handleQuality}
        showCapIMG={showCapIMG}
        showSetRange={showSetRange}
      />
    </>
  );
};
export default Question;
