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
  const [questionList, setquestionList] = useState(null);
  const [yesNo, setyesNo] = useState();
  const [quality, setquality] = useState();
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
  const [dropDown, setdropDown] = useState(false);
  const [selected, setselected] = useState([]);
  const [disableBtn, setdisableBtn] = useState();
  const [revActionable, setrevActionable] = useState(0);
  useEffect(() => {
    console.log("🚀 ~ file: index.js:42 ~ useEffect ~ question:", question)
    setstartAudit(question?.audit_type == 0 ? 1 : 2);
    unsubscribe;
    setremark(question?.data?.actionsble_remark);
    emitRemark(question?.data?.actionsble_remark);
    if (question?.data?.check_box_value) {
      // setquestionList(question.data.check_box_value.split(","));
      var item = question?.data?.check_box_value.split(",");
      var copy = [];
      item.map((element) => {
        copy.push({ name: element });
      });
      setquestionList(copy);
    }
  }, []);
  useEffect(() => {
    if (question?.data?.yes_no == "NO" && question?.data?.action_on_no == 2) {
      setshowCapIMG(false);
    } else if (yesNo == "NA") {
      setshowCapIMG(false);
    } else {
      setshowCapIMG(true);
    }
  }, [question]);
  useEffect(() => {
    socket.on("image-sent", (data) => {
      if (data.socketEvent == "updateCaptureimage" + question?.audit_id) {
        getIMG();
      }
    });
  }, []);
  useEffect(() => {
    if (reviewValue > 0) {
      HandleActionable(0);
      setshowActionable(false);
    } else {
      setshowActionable(true);
    }
  }, [reviewValue]);

  useEffect(() => {
    if (startAudit === 1) {
      const params = {
        question_id: question?.data?.question_id,
        audit_id: question?.audit_id,
      };
      socket.emit("startAudit", params, async (data) => {
        // console.log("data: ", data);
      });
    }
    socket.on("bmOnlineStatus", (data) => {
      if (data.socketEvent == `pauseOnlineAudit${question?.audit_id}`) {
        if (data.data.bm_online == 0) {
          alert(`BM is offline`);
          setdisableBtn(data.data.bm_online);
        }
      }
    });
    // if (!managerJoin && question?.audit_type == 1) {
    //   alert(`BM is offline`);
    // }
  }, [startAudit, managerJoin]);

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
      setisLoading(false);
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
        var checked_val = "";
        questionList &&
          questionList.map((list) => {
            if (list.isSelected) {
              checked_val += list.name + ",";
            }
          });
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
        formdata.append("check_box_data", checked_val);
        formdata.append("check_answer", checkedAns);
        formdata.append("show_actionable", showActionable);
        if (question?.data.image_capture === "1") {
          if (camImg.length > 0) {
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
            setisLoading(false);
            SubmitAPI(formdata);
          } else {
            setisLoading(false);
            if (question.data.action_on_no) {
              !showCapIMG
                ? SubmitAPI(formdata)
                : alert("Please Capture The Image");
            } else {
              alert("Please Capture The Image");
            }
          }
        } else {
          setisLoading(false);
          SubmitAPI(formdata);
        }
      } else {
        setisLoading(false);
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
        if (response.status === 200) {
          // navigation.navigate("AuditScore")
          setstartAudit(3);
        } else {
          navigator.navigate("DashboardScreen");
        }
      }
    });
  };
  const GetSocketData = async (data, params) => {
    if (data.status === 200) {
      if (data.data.check_box_value) {
        // setquestionList(data.data.check_box_value.split(","));
        var item = data.data.check_box_value.split(",");
        var copy = [];
        item.map((element) => {
          copy.push({ name: element });
        });
        setquestionList(copy);
      }
      // setSliderValue(response.data.data)
      setshowCapIMG(true);
      setremark(data.data.actionsble_remark);
      emitRemark(data.data.actionsble_remark);
      //setshowActionable(data.data.count_actionable===1?true:false)
      setshowActionable(true);
      // console.log('data.data: ', data.data);
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
        setCamImg([]);
        setyesNo();
        setquality(0);
        setReviewValue(0);
        setcheckedAns("");
      } else {
        setCamImg([]);
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
      if (response.status === 200) {
        // navigation.navigate("AuditScore");
        setstartAudit(3);
      } else {
        navigator.navigate("DashboardScreen");
      }
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
    setisLoading(true);
    const params = {
      audit_id: question?.audit_id,
      question_id: question?.data?.question_id,
    };
    socket.emit("captureImageRequest", params, (data) => {
      if (data.status === 200) {
        socket.on("image-sent", (data) => {
          if (
            data.socketEvent ==
            "updateCaptureimage" +
              question?.audit_id +
              question?.data.question_id
          ) {
            getIMG();
            setCamImg([...data.image_data]);
          }
          setisLoading(false);
        });
      }
    });
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  };
  const getIMG = async () => {
    setisLoading(true);
    const params = {
      audit_id: question?.audit_id,
      question_id: question?.data?.question_id,
    };
    socket.emit("customergetImagedata", params, (data) => {
      if (data.socketEvent == "customergetImagedata" + question.audit_id) {
        getIMGSOCKET(data);
        setisLoading(false);
      }
    });
  };
  const getIMGSOCKET = async (data) => {
    if (data.status === 200) {
      setBaseUrl(data.base_url);
      setCamImg(data.data);
    }
  };
  const handleManagerJoin = (data) => {
     alert(data)
    setmanagerJoin(data);
  };

  const handleJoin = (data) => {
    alert(data)
    setBmJoined(data);
  };
  const prevQuestion = async () => {
    try {
      setCamImg([]);
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
        setyesNo(response.data.answer.yes_no);
        if (response.data.data.check_box_value) {
          setquestionList(response.data.data[0].check_box_value.split(","));
          var item = response.data.data[0].check_box_value.split(",");
          var copy = [];
          item.map((element) => {
            copy.push({ name: element });
          });
          setquestionList(copy);
        }
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
        //console.log("esponse.data.data[0]: ", esponse.data.data[0]);
        setquestion({
          data: response.data.data[0],
          audit_id: params.audit_id,
          audit_type: params.audit_type,
          branch_manager: params.branch_manager,
        });
        //console.log("RES:", response.data.answer.remark);
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
    socket.emit("deleteCaptureImg", params, (data) => {});
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
    if (question?.data.action_on_yes === 1) {
      setshowActionable(state);
    }
    if (!state) {
      if (question?.data.action_on_no == 2) {
        setshowCapIMG(true);
      }
    }
    if (state) {
      if (question?.data.action_on_no == 2) {
        setshowCapIMG(false);
        setCamImg([]);
      }
    } else {
      setshowActionable(true);
    }
  };
  const handleQuality = async (text) => {
    setquality(text);
    const params = {
      audit_id: question?.audit_id,
      question_id: question?.data?.question_id,
      count_previous_question_id: question?.data?.count_previous_question_id,
      qty: text,
      count_type: question?.data?.count_type,
    };
    socket.emit("qtyView", params);
    if (question.data.count_actionable === 1) {
      if (text >= 0 && text <= 1) {
        setshowActionable(true);
      } else {
        setshowActionable(false);
      }
    }
    await socket.emit("CountQuestionType", params, (data) => {
      // console.log("data: ", data.data.actioanble);

      if (question?.data?.count_previous_question_id != null) {
        if (data?.data?.set_range) {
          console.log("else", data.data.set_range);
          setremark("");
          setReviewValue(data.data.set_range);
        } else if (data.data.actioanble == 1) {
          setReviewValue(0);
          setshowActionable(true);
          setremark(data.data.remark);
        } else {
          setReviewValue(0);
          setremark("");
          setshowActionable(false);
        }
      } else if (text < 2) {
        setrmmactionable(1);
        setremark(data.data.rm_remark);
        setbmActionable(0);
        setatmActionable(0);
        setadminActionable(0);
        setshowActionable(true);
      } else if (data.data.actioanble == 2) {
        // setReviewValue(0);
        setshowActionable(false);
        setremark("");
      } else {
        setrmmactionable(0);
        setremark("");
        setbmActionable(0);
        setatmActionable(0);
        setadminActionable(0);
      }
    });
    // if (question?.data?.count_previous_question_id != null) {
    //   console.log("emit case 1");
    //   await socket.emit("CountQuestionType", params, (data) => {
    //     console.log("CountQuestionType: 1", data);
    //     if (data?.data?.set_range) {
    //       console.log("else",data.data.set_range)
    //       setReviewValue(data.data.set_range);
    //     } else if (data.data.actioanble == 1) {
    //       console.log("else case 2");
    //       console.log("else data.data.actioanble",data.data.actioanble)
    //       console.log("else data.data.remark",data.data.remark)
    //       setReviewValue(0);
    //       setshowActionable(true);
    //       setremark(data.data.remark);
    //     } else {
    //       setReviewValue(0);
    //       setshowActionable(false);
    //     }
    //   });
    // }
  };
  const showSetRange = (state) => {
    if (state) {
      setReviewValue(question.data.set_range_1);
      emitRating(question.data.set_range_1);
    } else {
      setReviewValue(question.data.set_range_2);
      emitRating(question.data.set_range_2);
    }
  };
  const HandleActionable = async (type) => {
    if (type === 1) {
      if (question.data.bm_remark !== "") setremark(question.data.bm_remark);
      setbmActionable(1);
      setrmmactionable(0);
      setatmActionable(0);
      setadminActionable(0);
      setrevActionable(1);
      setdropDown(!dropDown);
    } else if (type === 2) {
      if (question.data.rm_remark !== "") setremark(question.data.rm_remark);
      setrmmactionable(1);
      setbmActionable(0);
      setatmActionable(0);
      setadminActionable(0);
      setrevActionable(1);
      setdropDown(!dropDown);
    } else if (type === 3) {
      setbmActionable(0);
      setrmmactionable(0);
      setatmActionable(1);
      setadminActionable(0);
      setrevActionable(1);
      setdropDown(!dropDown);
    } else if (type === 0) {
      setremark("");
      setbmActionable(0);
      setrmmactionable(0);
      setatmActionable(0);
      setadminActionable(0);
      setrevActionable(0);
    } else {
      setbmActionable(0);
      setrmmactionable(0);
      setatmActionable(0);
      setadminActionable(1);
      setrevActionable(1);
      setdropDown(!dropDown);
    }
  };
  const handleCheckList = async (index) => {
    const itemsArray = await [...questionList];
    itemsArray[index].isSelected = await !itemsArray[index].isSelected;
    setquestionList(itemsArray);
  };
  // console.log("QES:", question);
  return (
    <>
      {isLoading && <Loader />}

      <QuestionView
        baseUrl={baseUrl}
        question={question}
        HandleActionable={HandleActionable}
        setquestion={setquestion}
        remark={remark}
        setremark={setremark}
        rating={rating}
        setrevActionable={setrevActionable}
        revActionable={revActionable}
        setrating={setrating}
        rmmactionable={rmmactionable}
        setrmmactionable={setrmmactionable}
        questionList={questionList}
        bmActionable={bmActionable}
        setbmActionable={setbmActionable}
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
        handleManagerJoin={(data) => handleManagerJoin(data)}
        token={route.params ? route.params.token : ""}
        channelId={route.params ? route.params.channelId : ""}
        handleJoin={(data) =>handleJoin(data)}
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
        dropDown={dropDown}
        setdropDown={setdropDown}
        selected={selected}
        setselected={setselected}
        handleCheckList={handleCheckList}
        disableBtn={disableBtn}
      />
    </>
  );
};
export default Question;
